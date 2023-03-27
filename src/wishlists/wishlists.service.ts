import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { WishesService } from '../wishes/wishes.service';

import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

import { Wishlist } from './entities/wishlist.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    private wishesService: WishesService,
  ) {}

  async createOne(user: User, createWishlistDto: CreateWishlistDto) {
    const wishes = await this.wishesService.findOne(
      createWishlistDto.itemsId[0],
    );

    const wishList = await this.wishlistRepository.save({
      ...createWishlistDto,
      owner: user,
      items: [wishes],
    });

    return wishList;
  }

  async findAll() {
    const wishlists = await this.wishlistRepository.find({
      relations: {
        owner: true,
      },
    });

    return wishlists;
  }

  async findOne(wishlistId: number) {
    const wishlist = await this.wishlistRepository.findOne({
      relations: {
        owner: true,
      },
      where: {
        id: wishlistId,
      },
    });

    return wishlist;
  }

  async updateOne(wishlistId: number, updateWishlistDto: UpdateWishlistDto) {
    await this.wishlistRepository.update(wishlistId, updateWishlistDto);

    return await this.findOne(wishlistId);
  }

  async removeOne(wishlistId: number) {
    const wishlist = this.findOne(wishlistId);

    await this.wishlistRepository.delete(wishlistId);

    return wishlist;
  }
}
