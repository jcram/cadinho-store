import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { EventoFilters, EventosService } from "./eventos.service";
import { CreateEventoDto } from "./dto/create-evento.dto";
import { UpdateEventoDto } from "./dto/update-evento.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

function parseBool(value?: string): boolean | undefined {
  if (value === undefined) return undefined;
  return value === "true" || value === "1";
}

@Controller("eventos")
export class EventosController {
  constructor(private readonly eventos: EventosService) {}

  @Get()
  findAll(
    @Query("destaque") destaque?: string,
    @Query("tipo") tipo?: string,
  ) {
    const filters: EventoFilters = { destaque: parseBool(destaque), tipo };
    return this.eventos.findAll(filters);
  }

  @Get("slug/:slug")
  findBySlug(@Param("slug") slug: string) {
    return this.eventos.findBySlug(slug);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.eventos.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateEventoDto) {
    return this.eventos.create(dto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() dto: UpdateEventoDto) {
    return this.eventos.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.eventos.remove(id);
  }
}
