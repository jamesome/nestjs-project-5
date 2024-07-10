import { PartialType } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { Category } from 'src/modules/enum';

export class FindTransactionDto extends PartialType(CreateTransactionDto) {
  @IsOptional()
  @Expose({ name: 'start_date' })
  startDate?: Date;

  @IsOptional()
  @Expose({ name: 'end_date' })
  endDate?: Date;

  @IsOptional()
  @Expose({ name: 'category' })
  category?: Category;

  @IsOptional()
  @Expose({ name: 'item_name' })
  itemName?: string;
}
