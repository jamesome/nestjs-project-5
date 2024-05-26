// import { CreateOptionV1Dto } from 'src/modules/tenant/option/v1/dto/create-option-v1.dto';

export class FindProductDto {
  name!: string;

  brand?: string;

  supply?: string;

  active?: string;

  // options!: CreateOptionV1Dto[];
}
