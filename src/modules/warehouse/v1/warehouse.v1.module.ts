import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
import { Warehouse } from '../entities/warehouse.entity';

@Module({
  controllers: [WarehouseController],
  providers: [WarehouseService],
  imports: [TypeOrmModule.forFeature([Warehouse])],
})
export class WarehouseV1Module {}
