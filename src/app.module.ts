import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CardModule } from "./card/card.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CardEntity } from "./card/card.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DEV_DB_URL,
      entities: [CardEntity],
      synchronize: true,
      logging: false,
    }),
    AuthModule,
    CardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
