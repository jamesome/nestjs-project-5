import { CreateOptionV1Dto } from '../../../option/v1/dto/create-option-v1.dto';
export class CreateProductDto {
  name!: string;
  options?: CreateOptionV1Dto;
}
