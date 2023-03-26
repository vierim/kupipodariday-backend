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

  findOne(id: number) {
    return `This action returns a #${id} offer`;
  }
}
