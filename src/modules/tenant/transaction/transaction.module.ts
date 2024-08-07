import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { LotService } from '../lot/lot.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, LotService],
})
export class TransactionModule {}
