import { CreateWarehouseV1Dto } from 'src/modules/tenant/warehouse/v1/dto/create-warehouse-v1.dto';
// import { CreateOptionV1Dto } from '../../../option/v1/dto/create-option-v1.dto';
export class CreateProductDto {
  name!: string;
  // options!: CreateOptionV1Dto[];
  warehouse!: CreateWarehouseV1Dto[];
}
