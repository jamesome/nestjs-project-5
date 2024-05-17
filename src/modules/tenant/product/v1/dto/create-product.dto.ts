import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { CreateOptionV1Dto } from 'src/modules/tenant/option/v1/dto/create-option-v1.dto';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 10, { message: '이름은 2자 이상, 10자 미만이어야 합니다.' })
  name!: string;
  options!: CreateOptionV1Dto[];
}
