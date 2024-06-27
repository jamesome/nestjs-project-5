import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateInventoryItemDto } from './create-inventory-item.dto';

export class CreateInventoryItemArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInventoryItemDto)
  data!: CreateInventoryItemDto[];
}
