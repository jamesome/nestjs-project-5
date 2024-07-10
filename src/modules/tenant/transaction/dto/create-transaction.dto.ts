import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Category, InputType } from 'src/modules/enum';

export class CreateTransactionDto {
  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY', {
      message: 'transaction.category',
    }),
  })
  @IsEnum(Category, {
    message: i18nValidationMessage('validation.rules.CATEGORY', {
      message: 'transaction.category',
    }),
  })
  @ApiProperty({
    example: 'incoming',
    type: 'enum',
  })
  category!: Category;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY', {
      message: 'transaction.input_type',
    }),
  })
  @IsEnum(InputType, {
    message: i18nValidationMessage('validation.rules.INPUT_TYPE', {
      message: 'transaction.input_type',
    }),
  })
  @ApiProperty({
    example: 'incoming',
    type: 'enum',
  })
  inputType!: InputType;

  createWorker!: string;
}
