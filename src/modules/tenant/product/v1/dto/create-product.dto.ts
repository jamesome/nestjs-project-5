import { CreateOptionV1Dto } from 'src/modules/tenant/option/v1/dto/create-option-v1.dto';

export class CreateProductDto {
  name!: string;
  options!: CreateOptionV1Dto[];
}
