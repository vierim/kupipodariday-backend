import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createOne(@Request() req, @Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistsService.createOne(req.user, createWishlistDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wishlistsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateOne(
    @Param('id') id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return this.wishlistsService.updateOne(id, updateWishlistDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.wishlistsService.removeOne(id);
  }
}
