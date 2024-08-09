import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CreateCardDto, SearchCardDto } from "./card.dto";
import { Card } from "./card";
import { CardEntity } from "./card.entity";
import { AuthGuard } from "src/authGuard";

@Controller("api/card")
export class CardController {
  constructor(private readonly cardService: Card) {}

  @UseGuards(AuthGuard)
  @Get("/get-one/:id")
  async getOneCard(@Param("id") id: { id: string }) {
    return await this.cardService.findOne(id.id);
  }

  @Post("/create")
  async createCard(@Body() createCardDto: CreateCardDto) {
    return await this.cardService.createCard(createCardDto);
  }

  @UseGuards(AuthGuard)
  @Patch("/update/:id")
  async updateCard(
    @Param("id") id: string,
    @Body() updateCardDto: CreateCardDto,
  ) {
    return await this.cardService.update(id, updateCardDto);
  }

  @UseGuards(AuthGuard)
  @Get("/get-all")
  async getAllCards() {
    return await this.cardService.findAll();
  }

  @UseGuards(AuthGuard)
  @Delete("/remove/:id")
  async removeCard(@Param("id") id: string) {
    await this.cardService.remove(id);
  }

  @Get("search")
  async searchCard(@Query() searchCardDto: SearchCardDto): Promise<{}> {
    console.log("first");
    if (!Object.keys(searchCardDto).length) {
      throw new BadRequestException(
        "At least one search parameter is required",
      );
    }
    return await this.cardService.searchCard(searchCardDto);
  }
}
