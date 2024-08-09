import { Module } from "@nestjs/common";
import { Card } from "./card";
import { CardController } from "./card.controller";
import { CardEntity } from "./card.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity])],
  providers: [Card],
  controllers: [CardController],
})
export class CardModule {}
