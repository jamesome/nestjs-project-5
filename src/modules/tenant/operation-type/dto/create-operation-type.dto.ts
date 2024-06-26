import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, MaxLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Category } from '../../enum';

export class CreateOperationTypeDto {
  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY', {
      message: 'operation_type.category',
    }),
  })
  @IsEnum(Category, {
    message: i18nValidationMessage('validation.rules.CATEGORY', {
      message: 'operation_type.category',
    }),
  })
  @ApiProperty({
    required: true,
    description: '구분. incoming(입고), outgoing(출고), movement(이동)',
    example: 'incoming',
    type: 'enum',
  })
  category!: Category;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY', {
      message: 'operation_type.name',
    }),
  })
  @MaxLength(50, {
    message: i18nValidationMessage('validation.rules.MAX_LENGTH', {
      message: 'operation_type.name',
    }),
  })
  @ApiProperty({
    required: true,
    description: '재고작업구분명',
    example: '발송후취소',
    maxLength: 50,
  })
  name!: string;
}
