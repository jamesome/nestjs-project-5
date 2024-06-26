import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Category, InputType } from 'src/modules/enum';

export class CreateInventoryTransactionDto {
  @Expose({ name: 'item_id' })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY', {
      message: 'inventory_transaction.item_id',
    }),
  })
  @ApiProperty({
    required: true,
    description: '품목 일련번호',
    example: 112,
  })
  itemId!: number;

  @Expose({ name: 'location_departure_id' })
  @IsOptional()
  locationDepartureId?: number | null;

  @Expose({ name: 'location_arrival_id' })
  @IsOptional()
  locationArrivalId?: number | null;

  @Expose({ name: 'lot_id' })
  @IsOptional()
  lotId?: number | null;

  @Expose({ name: 'operation_type_id' })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY', {
      message: 'inventory_transaction.operation_type_id',
    }),
  })
  operationTypeId!: number;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY', {
      message: 'inventory_transaction.category',
    }),
  })
  @IsEnum(Category, {
    message: i18nValidationMessage('validation.rules.CATEGORY', {
      message: 'inventory_transaction.category',
    }),
  })
  @ApiProperty({
    example: 'incoming',
    type: 'enum',
  })
  category!: Category;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY', {
      message: 'inventory_transaction.input_type',
    }),
  })
  @IsEnum(InputType, {
    message: i18nValidationMessage('validation.rules.INPUT_TYPE', {
      message: 'inventory_transaction.input_type',
    }),
  })
  @ApiProperty({
    example: 'incoming',
    type: 'enum',
  })
  inputType!: InputType;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY', {
      message: 'inventory_transaction.quantity',
    }),
  })
  @IsInt({
    message: i18nValidationMessage('validation.rules.IS_INT', {
      message: 'inventory_transaction.quantity',
    }),
  })
  @Min(1, {
    message: i18nValidationMessage('validation.rules.MIN', {
      message: 'inventory_transaction.quantity',
    }),
  })
  quantity!: number;

  @IsOptional()
  @ApiProperty({
    required: false,
    description: '비고',
    example: '입고입니다.',
  })
  remark?: string;

  createWorker!: string;
}
