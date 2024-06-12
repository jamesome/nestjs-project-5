import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateItemLocationDto } from './create-item-location.dto';

export class CreateItemLocationArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemLocationDto)
  data!: CreateItemLocationDto[];
}
