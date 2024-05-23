import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateProductDto } from 'src/modules/tenant/product/v1/dto/create-product.dto';

export class CreateWarehouseV1Dto {
  name!: string;

  @ValidateNested()
  @Type(() => CreateProductDto)
  product!: CreateProductDto;
}
