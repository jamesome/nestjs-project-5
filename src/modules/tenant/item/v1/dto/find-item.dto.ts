import { PartialType } from '@nestjs/swagger';
import { CreateItemDto } from './create-item.dto';
import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { TransformStringToNumber } from 'src/common/decorators/transform-string-to-number';

export class FindItemDto extends PartialType(CreateItemDto) {
  @IsOptional()
  @Expose({ name: 'item_code' })
  itemCode!: string;

  @IsOptional()
  @Transform(({ value }) => (value === undefined || value === null ? 0 : value))
  @TransformStringToNumber()
  @Expose({ name: 'include_inventory' })
  includeInventory!: number;
}
