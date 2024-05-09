import { Module } from '@nestjs/common';
import { WarehouseV1Module } from './v1/warehouse.v1.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    WarehouseV1Module,
    RouterModule.register([{ path: 'v1', module: WarehouseV1Module }]),
  ],
})
export class WarehouseModule {}
