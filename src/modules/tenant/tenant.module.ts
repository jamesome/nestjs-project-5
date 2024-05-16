import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ProductV1Module } from './product/v1/product-v1.module';
import { OptionV1Module } from './option/v1/option-v1.module';
import { WarehouseV1Module } from './warehouse/v1/warehouse-v1.module';
import { ProductV2Module } from './product/v2/product-v2.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'tenant',
        children: [
          {
            path: 'v1',
            module: ProductV1Module,
          },
          {
            path: 'v2',
            module: ProductV2Module,
          },
          {
            path: 'v1',
            module: OptionV1Module,
          },
          {
            path: 'v1',
            module: WarehouseV1Module,
          },
        ],
      },
    ]),
    ProductV1Module,
    OptionV1Module,
    WarehouseV1Module,
    ProductV2Module,
  ],
})
export class TenantModule {}
