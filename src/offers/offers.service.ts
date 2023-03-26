import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateOfferDto } from './dto/create-offer.dto';

import { Offer } from './entities/offer.entity';
import { User } from '../users/entities/user.entity';
import { WishesService } from '../wishes/wishes.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    private wishesService: WishesService,
  ) {}

  async createOne(user: User, createOfferDto: CreateOfferDto) {
    const { itemId, amount, hidden } = createOfferDto;

    const item = await this.wishesService.findOne(itemId);

    const offer = await this.offerRepository.save({
      amount,
      hidden,
      user,
      item,
    });

    return offer;
  }

  async findOne(id: number) {
    const offer = await this.offerRepository.findOneBy({ id });

    return offer;
  }

  async findAll(userId: number) {
    const offers = await this.offerRepository.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: userId,
        },
      },
    });

    return offers;
  }
}
