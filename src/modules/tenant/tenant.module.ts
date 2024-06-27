import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { WarehouseModule } from './warehouse/v1/warehouse.module';
import { ZoneModule } from './zone/v1/zone.module';
import { LocationModule } from './location/v1/location.module';
import { ItemModule } from './item/v1/item.module';
import { SupplierModule } from './supplier/v1/supplier.module';
import { InventoryItemModule } from './inventory-item/inventory-item.module';
import { InventoryTransactionModule } from './inventory-transaction/inventory-transaction.module';
import { ItemSerialModule } from './item-serial/item-serial.module';
import { ItemCodeModule } from './item-code/v1/item-code.module';
import { LotModule } from './lot/lot.module';
import { OperationTypeModule } from './operation-type/operation-type.module';

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
              SupplierModule,
              InventoryItemModule,
              OperationTypeModule,
              InventoryTransactionModule,
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
    ItemCodeModule,
    SupplierModule,
    InventoryItemModule,
    ItemSerialModule,
    LotModule,
    OperationTypeModule,
    InventoryTransactionModule,
  ],
  providers: [],
})
export class TenantModule {}
