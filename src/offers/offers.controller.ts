import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OffersService } from './offers.service';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CreateOfferDto } from './dto/create-offer.dto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createOfferDto: CreateOfferDto) {
    //return this.offersService.create(createOfferDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findOne() {
    //return this.offersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  find(@Param('id') id: string) {
    //return this.offersService.updateOne(+id, updateOfferDto);
  }
}
