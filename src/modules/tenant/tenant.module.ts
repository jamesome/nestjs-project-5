import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { WarehouseModule } from './warehouse/v1/warehouse.module';
import { ZoneModule } from './zone/v1/zone.module';
import { LocationModule } from './location/v1/location.module';
import { ItemModule } from './item/v1/item.module';
import { ItemCode } from './item-code/v1/entities/item-code.entity';
import { ItemLocation } from './item-location/entities/item-location.entity';
import { SupplierModule } from './supplier/v1/supplier.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'tenant/:domain',
        children: [
          {
            path: 'v1',
            children: [
              WarehouseModule,
              ZoneModule,
              LocationModule,
              ItemModule,
              ItemCode,
              ItemLocation,
              SupplierModule,
            ],
          },
          {
            path: 'v2',
            children: [],
          },
        ],
      },
    ]),
    WarehouseModule,
    ZoneModule,
    LocationModule,
    ItemModule,
    ItemCode,
    ItemLocation,
    SupplierModule,
  ],
  providers: [],
})
export class TenantModule {}
