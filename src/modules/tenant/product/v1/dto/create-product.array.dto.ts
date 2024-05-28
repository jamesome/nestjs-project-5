import { IsArray, ValidateNested } from 'class-validator';
import { CreateProductDto } from './create-product.dto';
import { Type } from 'class-transformer';

export class CreateProductArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  items!: CreateProductDto[];
}
