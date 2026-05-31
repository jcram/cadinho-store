import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateEventoDto {
  @IsString()
  @MinLength(1)
  nome: string;

  @IsString()
  @MinLength(1)
  tipo: string;

  @IsString()
  @MinLength(1)
  descricao: string;

  @IsOptional()
  @IsString()
  fotoUrl?: string;

  @IsOptional()
  @IsUrl(
    { require_protocol: true, protocols: ["http", "https"], require_tld: false },
    { message: "link deve ser uma URL http(s) completa" },
  )
  @MaxLength(2048)
  link?: string;

  @IsOptional()
  @IsBoolean()
  destaque?: boolean;
}
