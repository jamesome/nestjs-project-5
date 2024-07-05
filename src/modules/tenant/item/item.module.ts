import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { LotService } from '../lot/lot.service';
import { TransactionService } from '../transaction/transaction.service';

@Module({
  controllers: [ItemController],
  providers: [ItemService, LotService, TransactionService],
})
export class ItemModule {}
