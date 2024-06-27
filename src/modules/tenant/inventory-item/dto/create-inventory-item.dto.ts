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
import { CreateItemSerialDto } from 'src/modules/item-serial/dto/create-item-serial.dto';
import { StockStatus } from 'src/modules/enum';

export class CreateInventoryItemDto {
  @Expose({ name: 'item_id' })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY', {
      message: 'inventory_item.item_id',
    }),
  })
  itemId!: number;

  @Expose({ name: 'location_id' })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY', {
      message: 'inventory_item.location_id',
    }),
  })
  locationId!: number;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY', {
      message: 'inventory_item.quantity',
    }),
  })
  @IsInt({
    message: i18nValidationMessage('validation.rules.IS_INT', {
      message: 'inventory_item.quantity',
    }),
  })
  @Min(1, {
    message: i18nValidationMessage('validation.rules.MIN', {
      message: 'inventory_item.quantity',
    }),
  })
  quantity!: number;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY', {
      message: 'inventory_item.status',
    }),
  })
  @IsEnum(StockStatus, {
    message: i18nValidationMessage('validation.rules.STOCK_STATUS', {
      message: 'inventory_item.status',
    }),
  })
  @ApiProperty({
    example: 'normal',
    type: 'enum',
  })
  status!: StockStatus;

  @Expose({ name: 'lot_no' })
  @IsOptional()
  @IsString({
    message: i18nValidationMessage('validation.rules.IS_STRING', {
      message: 'inventory_item.lot_no',
    }),
  })
  @MaxLength(50, {
    message: i18nValidationMessage('validation.rules.MAX_LENGTH', {
      message: 'inventory_item.lot_no',
    }),
  })
  lotNo?: string | null;

  @Expose({ name: 'expiration_date' })
  @IsOptional()
  expirationDate?: Date | null = null;

  @Expose({ name: 'item_serial' })
  @IsOptional()
  @Type(() => CreateItemSerialDto)
  itemSerial!: CreateItemSerialDto;

  @Expose({ name: 'supplier_id' })
  @IsOptional()
  supplierId!: number;

  @IsOptional()
  @Expose({ name: 'operation_type_id' })
  operationTypeId!: number;

  @IsOptional()
  remark?: string;
}
