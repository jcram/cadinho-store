import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class CreateDiscoDto {
  @IsString()
  titulo: string;

  @IsString()
  artista: string;

  @IsString()
  genero: string;

  @IsInt()
  @Min(1900)
  @Max(2100)
  ano: number;

  @IsNumber()
  @Min(0)
  preco: number;

  @IsOptional()
  @IsString()
  capaUrl?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  estoque?: number;

  @IsOptional()
  @IsIn(["disponivel", "esgotado"])
  status?: string;

  @IsOptional()
  @IsBoolean()
  destaque?: boolean;
}
