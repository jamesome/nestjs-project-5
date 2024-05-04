import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';

@Module({
  controllers: [WarehouseController],
  providers: [WarehouseService],
  imports: [TypeOrmModule.forFeature([Warehouse])],
})
export class WarehouseModule {}
