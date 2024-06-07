import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { StockStatus } from 'src/modules/location/entities/enum';

export class CreateItemLocationDto {
  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY'),
  })
  @Expose({ name: 'item_id' })
  itemId!: number;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY'),
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
  quantity!: number;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.rules.IS_NOT_EMPTY', {
      message: 'item_location.status',
    }),
  })
  @IsEnum(StockStatus, {
    message: i18nValidationMessage('validation.rules.STATUS', {
      message: 'item_location.status',
    }),
  })
  @ApiProperty({
    example: 'normal',
    type: 'enum',
  })
  status!: StockStatus;
}
