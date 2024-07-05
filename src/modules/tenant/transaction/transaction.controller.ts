import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
// import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { FindTransactionDto } from './dto/find-transaction.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PartialResponseInterceptor } from 'src/common/interceptors/partial-response.interceptor';

// TODO: 하위호환 유지 inventory-transactions
@Controller(['inventory-transactions', 'transactions'])
@ApiTags('Transaction API')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    return await this.transactionService.create(createTransactionDto);
  }

  @Post('incoming')
  @UseInterceptors(new PartialResponseInterceptor())
  async incoming(@Body() body: { data: any[] }) {
    return await this.transactionService.incoming(body.data);
  }

  @Post('movement')
  @UseInterceptors(new PartialResponseInterceptor())
  async movement(@Body() body: { data: any[] }) {
    return await this.transactionService.movement(body.data);
  }

  @Get()
  async findAll(@Query() findTransactionDto: FindTransactionDto) {
    return await this.transactionService.findAll(findTransactionDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.transactionService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return await this.transactionService.update(id, updateTransactionDto);
  }
}
