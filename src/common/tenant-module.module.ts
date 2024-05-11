import { Module } from '@nestjs/common';
import { ShopModule } from 'src/modules/tenant/shop/shop.module';
import { WarehouseV1Module } from 'src/modules/tenant/warehouse/v1/warehouse.v1.module';
import { RouterModule } from '@nestjs/core';
import { TenantModule } from 'src/modules/tenant.module';

@Module({
  imports: [
    ShopModule,
    WarehouseV1Module,
    RouterModule.register([
      {
        path: 'tenant',
        module: TenantModule,
        children: [ShopModule, { path: 'v1', module: WarehouseV1Module }],
      },
    ]),
  ],
})
export class TenantModuleModule {}
