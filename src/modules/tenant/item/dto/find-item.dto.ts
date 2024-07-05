import { PartialType } from '@nestjs/swagger';
import { CreateItemDto } from './create-item.dto';
import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { TransformStringToNumber } from 'src/common/decorators/transform-string-to-number';

export class FindItemDto extends PartialType(CreateItemDto) {
  @IsOptional()
  @Expose({ name: 'item_code' })
  itemCode!: string;

  // TODO: include 추가 되면 includeInventory삭제
  @Expose({ name: 'include_inventory' })
  @IsOptional()
  @Transform(({ value }) => (value === undefined || value === null ? 0 : value))
  @TransformStringToNumber()
  includeInventory!: number;

  @IsOptional()
  include?: string | null;

  @IsOptional()
  @Expose({ name: 'location_id' })
  locationId?: number;
}
