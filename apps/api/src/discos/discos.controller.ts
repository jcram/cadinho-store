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
import { DiscoFilters, DiscosService } from "./discos.service";
import { CreateDiscoDto } from "./dto/create-disco.dto";
import { UpdateDiscoDto } from "./dto/update-disco.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

function parseBool(value?: string): boolean | undefined {
  if (value === undefined) return undefined;
  return value === "true" || value === "1";
}

@Controller("discos")
export class DiscosController {
  constructor(private readonly discos: DiscosService) {}

  @Get()
  findAll(
    @Query("destaque") destaque?: string,
    @Query("genero") genero?: string,
    @Query("status") status?: string,
  ) {
    const filters: DiscoFilters = {
      destaque: parseBool(destaque),
      genero,
      status,
    };
    return this.discos.findAll(filters);
  }

  @Get("slug/:slug")
  findBySlug(@Param("slug") slug: string) {
    return this.discos.findBySlug(slug);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.discos.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateDiscoDto) {
    return this.discos.create(dto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() dto: UpdateDiscoDto) {
    return this.discos.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.discos.remove(id);
  }
}
