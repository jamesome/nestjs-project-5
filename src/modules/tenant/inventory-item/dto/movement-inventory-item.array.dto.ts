import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { MovementInventoryItemDto } from './movement-inventory-item.dto';

export class MovementInventoryItemArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MovementInventoryItemDto)
  data!: MovementInventoryItemDto[];
}
