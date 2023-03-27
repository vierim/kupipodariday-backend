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
import { WishesService } from './wishes.service';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createOne(@Request() req, @Body() createWishDto: CreateWishDto) {
    return this.wishesService.createOne(req.user, createWishDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('last')
  findLastWishes() {
    return this.wishesService.findLastWishes();
  }

  @UseGuards(JwtAuthGuard)
  @Get('top')
  findTopWishes() {
    //return this.wishesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wishesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateOne(@Param('id') id: number, @Body() updateWishDto: UpdateWishDto) {
    //return this.wishesService.updateOne(+id, updateWishDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removeOne(@Param('id') id: string) {
    //return this.wishesService.removeOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/copy')
  copyOne(@Body() createWishDto: CreateWishDto) {
    //return this.wishesService.create(createWishDto);
  }
}
