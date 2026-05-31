import { Module } from "@nestjs/common";
import { DiscosController } from "./discos.controller";
import { DiscosService } from "./discos.service";

@Module({
  controllers: [DiscosController],
  providers: [DiscosService],
})
export class DiscosModule {}
