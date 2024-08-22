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
import { AdminSearchCardDto, CreateCardDto, SearchCardDto } from "./card.dto";
import { Card } from "./card";
import { AuthGuard } from "src/authGuard";
import { CardDetails } from "src/types";

@Controller("api/card")
export class CardController {
  constructor(private readonly cardService: Card) {}

  @Get("/get-one/:id")
  async getOneCard(@Param("id") id: string) {
    console.log(id);
    return await this.cardService.findOne(id);
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
    if (!Object.keys(searchCardDto).length) {
      throw new BadRequestException(
        "At least one search parameter is required",
      );
    }
    return await this.cardService.searchCard(searchCardDto);
  }

  @UseGuards(AuthGuard)
  @Get("admin/search")
  async searchCards(
    @Query() searchCardDto: AdminSearchCardDto,
  ): Promise<CardDetails[]> {
    return this.cardService.adminSearchCard(searchCardDto);
  }
}
