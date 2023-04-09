import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { OffersService } from './offers.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOfferDto } from './dto/create-offer.dto';

import type { TAdvancedRequest } from '../types';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createOne(
    @Request() req: TAdvancedRequest,
    @Body() createOfferDto: CreateOfferDto,
  ) {
    return this.offersService.createOne(req.user, createOfferDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: TAdvancedRequest) {
    return this.offersService.findMany(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.offersService.findOne(id);
  }
}
