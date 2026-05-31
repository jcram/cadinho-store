import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { Request } from "express";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const auth = req.headers.authorization;

    if (!auth?.startsWith("Bearer ")) {
      throw new UnauthorizedException("Token ausente");
    }

    const token = auth.slice("Bearer ".length);
    try {
      const payload = await this.jwt.verifyAsync(token);
      (req as Request & { user?: unknown }).user = payload;
      return true;
    } catch {
      throw new UnauthorizedException("Token inválido ou expirado");
    }
  }
}
