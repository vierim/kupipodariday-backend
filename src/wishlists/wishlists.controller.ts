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

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

import type { TAdvancedRequest } from '../types';

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
  createOne(
    @Request() req: TAdvancedRequest,
    @Body() createWishlistDto: CreateWishlistDto,
  ) {
    return this.wishlistsService.create(req.user, createWishlistDto);
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
    @Request() req: TAdvancedRequest,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return this.wishlistsService.updateOne(id, req.user, updateWishlistDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: number, @Request() req: TAdvancedRequest) {
    return this.wishlistsService.removeOne(id, req.user);
  }
}
