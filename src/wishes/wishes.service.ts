import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

import { Wish } from './entities/wish.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async createOne(user: User, createWishDto: CreateWishDto) {
    console.log({
      ...createWishDto,
      owner: user,
    });

    const wish = await this.wishRepository.save({
      ...createWishDto,
      owner: user,
    });

    return wish;
  }

  async findOne(id: number) {
    const wish = await this.wishRepository.findOneBy({ id });

    return wish;
  }

  updateOne(id: number, updateWishDto: UpdateWishDto) {
    return `This action updates a #${id} wish`;
  }

  removeOne(id: number) {
    return `This action removes a #${id} wish`;
  }
}
