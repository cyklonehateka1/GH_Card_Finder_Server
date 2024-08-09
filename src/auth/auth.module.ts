import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { Auth } from "./auth";
import { JwtModule } from "@nestjs/jwt";
import * as dotenv from "dotenv";
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRETE,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AuthController],
  providers: [Auth],
})
export class AuthModule {}
