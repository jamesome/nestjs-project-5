import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Expose } from 'class-transformer';
import { StockStatus } from 'src/modules/tenant/enum';

export class CreateLocationDto {
  @IsNotEmpty({
    message: i18nValidationMessage('validation.IS_NOT_EMPTY'),
  })
  @Expose({ name: 'zone_id' })
  zoneId!: number;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.IS_NOT_EMPTY'),
  })
  @Length(1, 100, {
    message: i18nValidationMessage('validation.LENGTH'),
  })
  @ApiProperty({
    required: true,
    description: '분류명',
    example: '보충창고',
    maxLength: 100,
    uniqueItems: true,
  })
  name!: string;

  @ApiProperty({
    example: 'normal',
    type: 'enum',
  })
  @IsEnum(StockStatus, {
    message: i18nValidationMessage('validation.STOCK_STATUS'),
  })
  @Expose({ name: 'stock_status' })
  stockStatus?: StockStatus;

  @IsOptional()
  @ApiProperty({
    required: false,
    description: '비고',
    example: '샤라랄라랄라~',
  })
  remark?: string;
}
