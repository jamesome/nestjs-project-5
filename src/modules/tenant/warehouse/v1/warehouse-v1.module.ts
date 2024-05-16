import { Module } from '@nestjs/common';
import { WarehouseV1Service } from './warehouse-v1.service';
import { WarehouseV1Controller } from './warehouse-v1.controller';
import { WarehouseV1Repository } from './warehouse-v1-repository';

@Module({
  controllers: [WarehouseV1Controller],
  providers: [WarehouseV1Service, WarehouseV1Repository],
})
export class WarehouseV1Module {}
