import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CardEntity } from "./card.entity";
import { Like, Repository } from "typeorm";
import { CreateCardDto, SearchCardDto } from "./card.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class Card {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
  ) {}

  async createCard(card: CreateCardDto): Promise<CardEntity> {
    const {
      dateReported,
      dob,
      idNumber,
      locationOfDocument,
      firstName,
      lastName,
      profileImg,
      repoter_address,
      repoter_name,
      repoter_phone,
      type,
    } = card;

    console.log(card);

    if (
      !dateReported ||
      !dob ||
      !idNumber ||
      !locationOfDocument ||
      !firstName ||
      !lastName ||
      !profileImg ||
      !repoter_address ||
      !repoter_name ||
      !repoter_phone ||
      !type
    )
      throw new BadRequestException("Missing required fields");

    const checkCard = await this.cardRepository.findOne({
      where: { idNumber },
    });

    if (checkCard) throw new BadRequestException("Card already exists");
    try {
      return await this.cardRepository.save(card);
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Failed to create card");
    }
  }

  async update(id: string, updateCardDto: CreateCardDto): Promise<CardEntity> {
    const card = await this.cardRepository.findOne({
      where: { id },
    });
    if (!card) {
      throw new NotFoundException("Card not found");
    }

    Object.assign(card, updateCardDto);

    try {
      return await this.cardRepository.save(card);
    } catch (error) {
      if (error.code === "23505") {
        // Unique violation
        throw new BadRequestException("You already have a card with this id.");
      }
      throw new InternalServerErrorException("Something went wrong");
    }
  }

  async findAll(): Promise<CardEntity[]> {
    return await this.cardRepository.find();
  }

  async findOne(id: string): Promise<CardEntity> {
    const card = await this.cardRepository.findOne({ where: { id } });
    if (!card) {
      throw new NotFoundException("Card not found");
    }
    return card;
  }

  async remove(id: string): Promise<void> {
    const card = await this.cardRepository.findOne({ where: { id } });
    if (!card) {
      throw new NotFoundException("Card not found");
    }
    await this.cardRepository.remove(card);
  }

  async searchCard(searchCardDto: SearchCardDto): Promise<any> {
    const { idNumber, firstName, lastName, dob } = searchCardDto;

    const query: any = {};

    if (idNumber) query.idNumber = Like(`%${idNumber}%`);
    if (firstName) query.firstName = Like(`%${firstName}%`);
    if (lastName) query.lastName = Like(`%${lastName}%`);
    if (dob) query.dob = Like(`%${dob}%`);

    const cards = await this.cardRepository.find({ where: query });

    if (cards.length === 0) {
      throw new NotFoundException(
        "No cards found matching the search criteria",
      );
    }

    return cards;
  }
}
