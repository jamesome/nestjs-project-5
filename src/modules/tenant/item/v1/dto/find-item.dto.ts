import { PartialType } from '@nestjs/swagger';
import { CreateItemDto } from './create-item.dto';
import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
// import { FindItemLocationDto } from 'src/modules/tenant/item-location/dto/find-item-location.dto';
import { TransformStringToNumber } from 'src/common/decorators/transform-string-to-number';

export class FindItemDto extends PartialType(CreateItemDto) {
  @IsOptional()
  @Expose({ name: 'item_code' })
  itemCode!: string;

  // @IsOptional()
  // @Expose({ name: 'item_code' })
  // itemLocation!: FindItemLocationDto;

  @IsOptional()
  @Transform(({ value }) => (value === undefined || value === null ? 0 : value))
  @TransformStringToNumber()
  @Expose({ name: 'include_inventory' })
  includeInventory!: number;
}
