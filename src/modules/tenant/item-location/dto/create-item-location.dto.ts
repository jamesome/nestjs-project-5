import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { StockStatus } from '../../location/v1/entities/enum';
import { CreateItemSerialDto } from '../../item-serial/dto/create-item-serial.dto';

export class CreateItemLocationDto {
  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY', {
      message: 'item_location.item_id',
    }),
  })
  @Expose({ name: 'item_id' })
  itemId!: number;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY', {
      message: 'item_location.location_id',
    }),
  })
  @Expose({ name: 'location_id' })
  locationId!: number;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY', {
      message: 'item_location.quantity',
    }),
  })
  @IsInt({
    message: i18nValidationMessage('validation.rules.IS_INT', {
      message: 'item_location.quantity',
    }),
  })
  @Min(1, {
    message: i18nValidationMessage('validation.rules.MIN', {
      message: 'item_location.quantity',
    }),
  })
  quantity!: number;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY', {
      message: 'item_location.status',
    }),
  })
  @IsEnum(StockStatus, {
    message: i18nValidationMessage('validation.rules.STOCK_STATUS', {
      message: 'item_location.status',
    }),
  })
  @ApiProperty({
    example: 'normal',
    type: 'enum',
  })
  status!: StockStatus;

  @IsOptional()
  @IsString({
    message: i18nValidationMessage('validation.rules.IS_STRING', {
      message: 'item_location.lot_no',
    }),
  })
  @MaxLength(50, {
    message: i18nValidationMessage('validation.rules.MAX_LENGTH', {
      message: 'item_location.lot_no',
    }),
  })
  @Expose({ name: 'lot_no' })
  lotNo!: string;

  @IsOptional()
  @Expose({ name: 'expiration_date' })
  expirationDate?: Date | null = null;

  @IsOptional()
  @Type(() => CreateItemSerialDto)
  @Expose({ name: 'item_serial' })
  itemSerial!: CreateItemSerialDto;

  @IsOptional()
  @Expose({ name: 'supplier_id' })
  supplierId?: number;

  @IsOptional()
  remark?: string;
}
