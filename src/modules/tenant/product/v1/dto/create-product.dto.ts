import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, Length } from 'class-validator';
import { CreateOptionV1Dto } from 'src/modules/tenant/option/v1/dto/create-option-v1.dto';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  // @Length(2, 10, {
  //   message: i18nValidationMessage('validation.Length', {
  //     message: '2',
  //   }),
  // })
  @Length(2, 10, {
    message: i18nValidationMessage('validation.Length'),
  })
  name!: string;

  @Type(() => CreateOptionV1Dto)
  options!: CreateOptionV1Dto[];
}
