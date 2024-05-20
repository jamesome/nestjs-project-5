import { Module } from '@nestjs/common';
import { WarehouseV1Controller } from './warehouse-v1.controller';
import { WarehouseV1Service } from './warehouse-v1.service';

@Module({
  controllers: [WarehouseV1Controller],
  providers: [WarehouseV1Service],
})
export class WarehouseV1Module {}
