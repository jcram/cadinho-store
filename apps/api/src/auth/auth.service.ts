import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const email = this.config.get<string>("ADMIN_EMAIL");
    const password = this.config.get<string>("ADMIN_PASSWORD");

    if (dto.email !== email || dto.password !== password) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    const token = await this.jwt.signAsync({ sub: email, role: "admin" });
    return { access_token: token, email };
  }
}
