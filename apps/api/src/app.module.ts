import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { DiscosModule } from "./discos/discos.module";
import { EventosModule } from "./eventos/eventos.module";
import { PedidosModule } from "./pedidos/pedidos.module";
import { UploadsModule } from "./uploads/uploads.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    DiscosModule,
    EventosModule,
    PedidosModule,
    UploadsModule,
  ],
})
export class AppModule {}
