import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OffersService } from './offers.service';

import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(createOfferDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(+id);
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offersService.updateOne(+id, updateOfferDto);
  }

  @Delete(':id')
  removeOne(@Param('id') id: string) {
    return this.offersService.removeOne(+id);
  }
}
