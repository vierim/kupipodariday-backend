import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  find() {
    //return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createOne() {
    //return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne() {
    //return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateOne() {
    //return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne() {
    //return this.appService.getHello();
  }
}
