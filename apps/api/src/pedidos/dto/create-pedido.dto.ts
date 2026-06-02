import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsInt,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";

export class CreatePedidoItemDto {
  @IsString()
  @MinLength(1)
  discoId: string;

  @IsInt()
  @Min(1)
  quantidade: number;
}

export class CreatePedidoDto {
  @IsString()
  @MinLength(1)
  nomeCliente: string;

  @IsEmail()
  emailCliente: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreatePedidoItemDto)
  itens: CreatePedidoItemDto[];
}
