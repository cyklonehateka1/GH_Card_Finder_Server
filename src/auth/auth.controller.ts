import { Body, Controller, Post } from "@nestjs/common";
import { Auth } from "./auth";

@Controller("api/auth")
export class AuthController {
  constructor(private authService: Auth) {}
  @Post("login")
  login(@Body() reqBody: { emailOrPhone: string; password: string }) {
    return this.authService.login(reqBody.emailOrPhone, reqBody.password);
  }
}
