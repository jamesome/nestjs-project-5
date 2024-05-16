import { CreateProductDto } from 'src/modules/tenant/product/v1/dto/create-product.dto';

export class CreateWarehouseV1Dto {
  name!: string;
  product!: CreateProductDto;
}
