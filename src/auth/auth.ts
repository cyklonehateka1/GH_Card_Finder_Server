import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class Auth {
  constructor(private readonly jwtService: JwtService) {}
  async login(emalOrPhone: string, password: string): Promise<{}> {
    if (!emalOrPhone || !password)
      throw new BadRequestException("All fields are required");

    if (
      emalOrPhone !== process.env.SUPER_USER_EMAIL ||
      password !== process.env.SUPER_USER_PASSWORD
    )
      throw new UnauthorizedException("Invalid credentials");

    const payload = {
      sub: process.env.SUPER_USER_ID,
      username: process.env.SUPER_USER_EMAIL,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
