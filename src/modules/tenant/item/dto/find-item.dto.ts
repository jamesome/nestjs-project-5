import { PartialType } from '@nestjs/swagger';
import { CreateItemDto } from './create-item.dto';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { FindItemLocationDto } from '../../item-location/dto/find-item-location.dto';

export class FindItemDto extends PartialType(CreateItemDto) {
  @IsOptional()
  @Expose({ name: 'item_code' })
  itemCode!: string;

  @IsOptional()
  @Expose({ name: 'item_code' })
  itemLocation!: FindItemLocationDto;

  // @IsOptional()
  // @Expose({ name: 'total_quantity' })
  // totalQuantity!: number;
}
