import { Allow, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsUrl()
  image: string;

  @IsOptional()
  @IsString()
  description: string;

  @Allow()
  itemsId: number[];
}
