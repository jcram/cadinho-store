import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePedidoDto } from "./dto/create-pedido.dto";

// Gera um "Pix copia e cola" SIMULADO (não é um BR Code válido).
// Quando entrar o PSP real (Mercado Pago/Stripe), troca-se só esta geração.
function gerarPixCopiaECola(total: number, txid: string): string {
  const valor = total.toFixed(2);
  const id = txid.replace(/[^a-zA-Z0-9]/g, "").slice(0, 20).toUpperCase();
  return (
    `00020126580014BR.GOV.BCB.PIX0136cadinho-${id}` +
    `520400005303986540${valor.length}${valor}` +
    `5802BR5910CADINHO LTDA6009SAO PAULO62070503***6304FAKE`
  );
}

@Injectable()
export class PedidosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePedidoDto) {
    // Agrupa quantidades por disco (evita itens duplicados no payload)
    const quantidades = new Map<string, number>();
    for (const item of dto.itens) {
      quantidades.set(
        item.discoId,
        (quantidades.get(item.discoId) ?? 0) + item.quantidade,
      );
    }

    const itensData: {
      discoId: string;
      titulo: string;
      artista: string;
      preco: number;
      quantidade: number;
    }[] = [];
    let total = 0;

    for (const [discoId, quantidade] of quantidades) {
      const disco = await this.prisma.disco.findUnique({
        where: { id: discoId },
      });
      if (!disco) {
        throw new BadRequestException(`Disco ${discoId} não encontrado`);
      }
      if (disco.status !== "disponivel" || disco.estoque < quantidade) {
        throw new BadRequestException(
          `"${disco.titulo}" sem estoque suficiente`,
        );
      }
      // total calculado no SERVIDOR a partir do preço real (nunca confiar no client)
      total += disco.preco * quantidade;
      itensData.push({
        discoId: disco.id,
        titulo: disco.titulo,
        artista: disco.artista,
        preco: disco.preco,
        quantidade,
      });
    }

    total = Math.round(total * 100) / 100;

    // cuid temporário só para o txid do Pix; o id real vem do banco
    const txid = `${Date.now().toString(36)}${itensData.length}`;
    const pixCopiaECola = gerarPixCopiaECola(total, txid);

    return this.prisma.pedido.create({
      data: {
        nomeCliente: dto.nomeCliente,
        emailCliente: dto.emailCliente,
        total,
        pixCopiaECola,
        status: "pendente",
        itens: { create: itensData },
      },
      include: { itens: true },
    });
  }

  findAll(status?: string) {
    return this.prisma.pedido.findMany({
      where: status ? { status } : undefined,
      include: { itens: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string) {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
      include: { itens: true },
    });
    if (!pedido) throw new NotFoundException(`Pedido ${id} não encontrado`);
    return pedido;
  }

  // Simula a confirmação do pagamento Pix.
  // No fluxo real, isto vira o webhook do PSP confirmando o recebimento.
  async pagar(id: string) {
    const pedido = await this.findOne(id);

    if (pedido.status === "pago") return pedido; // idempotente
    if (pedido.status === "cancelado") {
      throw new BadRequestException("Pedido cancelado não pode ser pago");
    }

    return this.prisma.$transaction(async (tx) => {
      // baixa de estoque com re-checagem (evita vender o que não há)
      for (const item of pedido.itens) {
        const disco = await tx.disco.findUnique({ where: { id: item.discoId } });
        if (!disco || disco.estoque < item.quantidade) {
          throw new BadRequestException(
            `"${item.titulo}" sem estoque para concluir o pagamento`,
          );
        }
        const novoEstoque = disco.estoque - item.quantidade;
        await tx.disco.update({
          where: { id: disco.id },
          data: {
            estoque: novoEstoque,
            status: novoEstoque <= 0 ? "esgotado" : disco.status,
          },
        });
      }

      return tx.pedido.update({
        where: { id },
        data: { status: "pago", pagoEm: new Date() },
        include: { itens: true },
      });
    });
  }
}
