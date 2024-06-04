import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { TransformEmptyToNull } from 'src/common/decorators/transform-empty-to-null';

export class CreateZoneDto {
  @IsNotEmpty({
    message: i18nValidationMessage('validation.IS_NOT_EMPTY'),
  })
  @Expose({ name: 'warehouse_id' })
  warehouseId!: number;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.IS_NOT_EMPTY'),
  })
  @MaxLength(10, {
    message: i18nValidationMessage('validation.MAX_LENGTH'),
  })
  @ApiProperty({
    required: true,
    description: '분류명',
    example: '보충창고',
    maxLength: 100,
    uniqueItems: true,
  })
  name!: string;

  @IsOptional()
  @TransformEmptyToNull()
  @MaxLength(100, {
    message: i18nValidationMessage('validation.MAX_LENGTH'),
  })
  @ApiProperty({
    required: false,
    description: '분류코드',
    example: 'a-01',
    maxLength: 100,
    uniqueItems: true,
  })
  code?: string | null;
}
