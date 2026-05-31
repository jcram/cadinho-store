import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateEventoDto } from "./dto/create-evento.dto";
import { UpdateEventoDto } from "./dto/update-evento.dto";

export type EventoFilters = {
  destaque?: boolean;
  tipo?: string;
};

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

@Injectable()
export class EventosService {
  constructor(private readonly prisma: PrismaService) {}

  private async uniqueSlug(base: string): Promise<string> {
    const root = slugify(base) || "evento";
    let slug = root;
    let n = 1;
    while (await this.prisma.evento.findUnique({ where: { slug } })) {
      slug = `${root}-${++n}`;
    }
    return slug;
  }

  async create(dto: CreateEventoDto) {
    const slug = await this.uniqueSlug(dto.nome);
    return this.prisma.evento.create({ data: { ...dto, slug } });
  }

  findAll(filters: EventoFilters = {}) {
    const where: Prisma.EventoWhereInput = {};
    if (filters.destaque !== undefined) where.destaque = filters.destaque;
    if (filters.tipo) where.tipo = filters.tipo;
    return this.prisma.evento.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string) {
    const evento = await this.prisma.evento.findUnique({ where: { id } });
    if (!evento) throw new NotFoundException(`Evento ${id} não encontrado`);
    return evento;
  }

  async findBySlug(slug: string) {
    const evento = await this.prisma.evento.findUnique({ where: { slug } });
    if (!evento) throw new NotFoundException(`Evento "${slug}" não encontrado`);
    return evento;
  }

  async update(id: string, dto: UpdateEventoDto) {
    await this.findOne(id);
    return this.prisma.evento.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.evento.delete({ where: { id } });
    return { id, deleted: true };
  }
}
