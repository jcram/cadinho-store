import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateDiscoDto } from "./dto/create-disco.dto";
import { UpdateDiscoDto } from "./dto/update-disco.dto";

export type DiscoFilters = {
  destaque?: boolean;
  genero?: string;
  status?: string;
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
export class DiscosService {
  constructor(private readonly prisma: PrismaService) {}

  private async uniqueSlug(base: string): Promise<string> {
    const root = slugify(base) || "disco";
    let slug = root;
    let n = 1;
    while (await this.prisma.disco.findUnique({ where: { slug } })) {
      slug = `${root}-${++n}`;
    }
    return slug;
  }

  async create(dto: CreateDiscoDto) {
    const slug = await this.uniqueSlug(`${dto.titulo} ${dto.artista}`);
    return this.prisma.disco.create({ data: { ...dto, slug } });
  }

  findAll(filters: DiscoFilters = {}) {
    const where: Prisma.DiscoWhereInput = {};
    if (filters.destaque !== undefined) where.destaque = filters.destaque;
    if (filters.genero) where.genero = filters.genero;
    if (filters.status) where.status = filters.status;
    return this.prisma.disco.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string) {
    const disco = await this.prisma.disco.findUnique({ where: { id } });
    if (!disco) throw new NotFoundException(`Disco ${id} não encontrado`);
    return disco;
  }

  async findBySlug(slug: string) {
    const disco = await this.prisma.disco.findUnique({ where: { slug } });
    if (!disco) throw new NotFoundException(`Disco "${slug}" não encontrado`);
    return disco;
  }

  async update(id: string, dto: UpdateDiscoDto) {
    await this.findOne(id);
    return this.prisma.disco.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.disco.delete({ where: { id } });
    return { id, deleted: true };
  }
}
