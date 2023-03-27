import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateWishDto } from './dto/create-wish.dto';

import { Wish } from './entities/wish.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async createOne(user: User, createWishDto: CreateWishDto) {
    const wish = await this.wishRepository.save({
      ...createWishDto,
      owner: user,
    });

    return wish;
  }

  async findOne(wishId: number) {
    const wish = await this.wishRepository.findOneBy({ id: wishId });

    return wish;
  }

  async findMany(userId: number) {
    const wishes = await this.wishRepository.find({
      relations: {
        owner: true,
        offers: true,
      },
      where: {
        owner: {
          id: userId,
        },
      },
    });

    return wishes;
  }

  async findLastWishes() {
    const wishes = await this.wishRepository.find({
      relations: {
        owner: true,
        offers: true,
      },
      take: 40,
    });

    return wishes;
  }
}
