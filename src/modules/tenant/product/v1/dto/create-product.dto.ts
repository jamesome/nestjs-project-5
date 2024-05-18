import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, Length, Validate, ValidateNested } from 'class-validator';
import { CreateOptionV1Dto } from 'src/modules/tenant/option/v1/dto/create-option-v1.dto';
import { i18nValidationMessage } from 'nestjs-i18n';
import { UniqueProductNameValidator } from 'src/validators/unique-product-name.validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  // @IsEmail({}, { message: i18nValidationMessage('validation.INVALID_EMAIL') })
  @Length(2, 10, {
    message: i18nValidationMessage('validation.LENGTH', {
      attribute: 'PRODUCT_NAME',
    }),
  })
  @Validate(UniqueProductNameValidator, {
    message: i18nValidationMessage('validation.UNIQUE_PRODUCT', {
      attribute: 'PRODUCT_NAME',
    }),
  })
  name!: string;

  @ValidateNested()
  @Type(() => CreateOptionV1Dto)
  options!: CreateOptionV1Dto[];
}
