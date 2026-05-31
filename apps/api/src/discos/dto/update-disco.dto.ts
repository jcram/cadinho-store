import { PartialType } from "@nestjs/mapped-types";
import { CreateDiscoDto } from "./create-disco.dto";

export class UpdateDiscoDto extends PartialType(CreateDiscoDto) {}
