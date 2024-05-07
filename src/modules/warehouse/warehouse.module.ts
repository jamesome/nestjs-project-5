import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { WarehouseV1Module } from './v1/warehouse.v1.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    WarehouseV1Module,
    RouterModule.register([{ path: 'v1', module: WarehouseV1Module }]),
    TypeOrmModule.forFeature([Warehouse]),
  ],
})
export class WarehouseModule {}
