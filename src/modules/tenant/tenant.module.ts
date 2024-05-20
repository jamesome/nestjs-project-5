import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ProductV1Module } from './product/v1/product-v1.module';
import { OptionV1Module } from './option/v1/option-v1.module';
import { WarehouseV1Module } from './warehouse/v1/warehouse-v1.module';
import { ProductV2Module } from './product/v2/product-v2.module';
import { ProductV1Repository } from './product/v1/productV1.repository';
import { UniqueValidator } from 'src/common/validators/unique.validator';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'tenant/*',
        children: [
          {
            path: 'v1',
            children: [ProductV1Module, OptionV1Module, WarehouseV1Module],
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
    WarehouseV1Module,
    ProductV2Module,
  ],
  providers: [
    ProductV1Repository,
    {
      provide: 'REPOSITORY',
      useFactory: (productV1Repository: ProductV1Repository) => ({
        ProductV1Repository: productV1Repository,
      }),
      inject: [ProductV1Repository],
    },
    UniqueValidator,
  ],
})
export class TenantModule {}
