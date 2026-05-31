import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "node:path";
import { randomBytes } from "node:crypto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

const ALLOWED = /\.(jpe?g|png|webp|avif)$/i;

@Controller("uploads")
export class UploadsController {
  @Post("capa")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: join(process.cwd(), "uploads"),
        filename: (_req, file, cb) => {
          const name = randomBytes(8).toString("hex");
          cb(null, `${name}${extname(file.originalname).toLowerCase()}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (!ALLOWED.test(file.originalname)) {
          return cb(
            new BadRequestException("Formato inválido (use jpg, png, webp ou avif)"),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  uploadCapa(@UploadedFile() file?: Express.Multer.File) {
    if (!file) throw new BadRequestException("Nenhum arquivo enviado");
    return { url: `/uploads/${file.filename}`, filename: file.filename };
  }
}
