import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { StockStatus } from '../../enum';

export class MovementInventoryItemDto {
  @Expose({ name: 'item_id' })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY', {
      message: 'inventory_item.item_id',
    }),
  })
  itemId!: number;

  @Expose({ name: 'location_departure_id' })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY', {
      message: 'inventory_item.location_departure_id',
    }),
  })
  locationDepartureId!: number;

  @Expose({ name: 'location_arrival_id' })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY', {
      message: 'inventory_item.location_arrival_id',
    }),
  })
  locationArrivalId!: number;

  @Expose({ name: 'lot_id' })
  @IsOptional()
  lotId?: string | null;

  @Expose({ name: 'operation_type_id' })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY', {
      message: 'inventory_item.operation_type_id',
    }),
  })
  operationTypeId!: number;

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
  status!: StockStatus;

  @IsNotEmpty({ message: 'validation.rules.IS_NOT_EMPTY' })
  @Min(1, { message: 'validation.rules.MIN' })
  quantity!: number;

  @IsOptional()
  remark?: string;
}
