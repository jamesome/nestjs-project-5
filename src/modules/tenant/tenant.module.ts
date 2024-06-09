import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ProductV1Module } from './product/v1/product-v1.module';
import { OptionV1Module } from './option/v1/option-v1.module';
import { ProductV2Module } from './product/v2/product-v2.module';
import { WarehouseModule } from './warehouse/v1/warehouse.module';
import { ZoneModule } from './zone/v1/zone.module';
import { LocationModule } from './location/v1/location.module';
import { ItemModule } from './item/v1/item.module';
import { ItemCode } from './item-code/v1/entities/item-code.entity';
import { ItemLocation } from './item-location/entities/item-location.entity';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'tenant/:domain',
        children: [
          {
            path: 'v1',
            children: [
              ProductV1Module,
              OptionV1Module,
              WarehouseModule,
              ZoneModule,
              LocationModule,
              ItemModule,
              ItemCode,
              ItemLocation,
            ],
          },
          {
            path: 'v2',
            children: [ProductV2Module],
          },
        ],
      },
    ]),
    ProductV1Module,
    OptionV1Module,
    WarehouseModule,
    ZoneModule,
    LocationModule,
    ItemModule,
    ItemCode,
    ItemLocation,
    ProductV2Module,
  ],
  providers: [],
})
export class TenantModule {}
