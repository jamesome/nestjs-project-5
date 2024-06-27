import { PartialType } from '@nestjs/swagger';
import { CreateInventoryTransactionDto } from './create-inventory-transaction.dto';
import { IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class FindInventoryTransactionDto extends PartialType(
  CreateInventoryTransactionDto,
) {
  @IsOptional()
  @Expose({ name: 'start_date' })
  startDate?: Date;

  @IsOptional()
  @Expose({ name: 'end_date' })
  endDate?: Date;

  @IsOptional()
  @Expose({ name: 'operation_type_category' })
  operationTypeCategory?: string;

  @IsOptional()
  @Expose({ name: 'item_name' })
  itemName?: string;
}
