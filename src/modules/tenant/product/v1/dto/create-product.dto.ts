import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, Length, ValidateNested } from 'class-validator';
import { CreateOptionV1Dto } from 'src/modules/tenant/option/v1/dto/create-option-v1.dto';
import { i18nValidationMessage } from 'nestjs-i18n';
// import { IsUnique } from 'src/common/decorators/is-unique.decorator';

export class CreateProductDto {
  /**
   * A list of user's roles
   * @example ['admin']
   */
  @IsNotEmpty()
  // @IsEmail({}, { message: i18nValidationMessage('validation.INVALID_EMAIL') })
  @Length(2, 10, {
    message: i18nValidationMessage('validation.LENGTH', {
      attribute: 'PRODUCT_NAME',
    }),
  })
  // @Validate(UniqueValidator, {
  //   message: i18nValidationMessage('validation.UNIQUE_PRODUCT', {
  //     attribute: 'PRODUCT_NAME',
  //   }),
  // })
  // @IsUnique('ProductV1Repository', {
  //   message: i18nValidationMessage('validation.UNIQUE', {
  //     attribute: 'PRODUCT_NAME',
  //   }),
  // })
  name!: string;

  @IsString({
    message: i18nValidationMessage('validation.IS_STRING', {
      attribute: 'PRODUCT_BRAND',
    }),
  })
  brand!: string;

  @IsString()
  supply!: string;

  active?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateOptionV1Dto)
  options!: CreateOptionV1Dto[];
}
