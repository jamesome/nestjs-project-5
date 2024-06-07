import { PartialType } from '@nestjs/swagger';
import { CreateItemLocationDto } from './create-item-location.dto';
import { IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class FindItemLocationDto extends PartialType(CreateItemLocationDto) {
  @IsOptional()
  @Expose({ name: 'total_quantity' })
  totalQuantity!: number;
}
