import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  create(createWishDto: CreateWishDto) {
    return 'This action adds a new wish';
  }

  findOne(id: number) {
    return `This action returns a #${id} wish`;
  }

  updateOne(id: number, updateWishDto: UpdateWishDto) {
    return `This action updates a #${id} wish`;
  }

  removeOne(id: number) {
    return `This action removes a #${id} wish`;
  }
}
