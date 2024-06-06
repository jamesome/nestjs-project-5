import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ProductV1Module } from './product/v1/product-v1.module';
import { OptionV1Module } from './option/v1/option-v1.module';
import { ProductV2Module } from './product/v2/product-v2.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { ZoneModule } from './zone/zone.module';
import { LocationModule } from './location/location.module';

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
              Location,
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
    ProductV2Module,
  ],
  providers: [],
})
export class TenantModule {}
