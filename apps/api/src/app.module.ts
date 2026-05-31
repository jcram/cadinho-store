import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { DiscosModule } from "./discos/discos.module";
import { EventosModule } from "./eventos/eventos.module";
import { UploadsModule } from "./uploads/uploads.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    DiscosModule,
    EventosModule,
    UploadsModule,
  ],
})
export class AppModule {}
