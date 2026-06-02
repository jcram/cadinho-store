import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { PedidosService } from "./pedidos.service";
import { CreatePedidoDto } from "./dto/create-pedido.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("pedidos")
export class PedidosController {
  constructor(private readonly pedidos: PedidosService) {}

  // Listagem é só do backoffice (protegida).
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query("status") status?: string) {
    return this.pedidos.findAll(status);
  }

  @Post()
  create(@Body() dto: CreatePedidoDto) {
    return this.pedidos.create(dto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.pedidos.findOne(id);
  }

  // Simulação do pagamento Pix (no fluxo real, seria um webhook do PSP).
  @Post(":id/pagar")
  pagar(@Param("id") id: string) {
    return this.pedidos.pagar(id);
  }
}
