import { ProductV1 } from 'src/modules/tenant/product/v1/entities/productV1.entity';
import { WarehouseV1 } from 'src/modules/tenant/warehouse/v1/entities/warehouse-v1.entity';
// import { WarehouseV1 } from 'src/modules/tenant/warehouse/v1/entities/warehouse-v1.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class WarehouseV1Seeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.log('\n\nWarehouseV1Seeder\n\n');
    const warehouseV1Repository = dataSource.getRepository(WarehouseV1);

    const productV1Factory = factoryManager.get(ProductV1);
    const warehouseV1Factory = factoryManager.get(WarehouseV1);

    const products = await productV1Factory.saveMany(2);

    const warehouses = await Promise.all(
      products.map(async (product: ProductV1) => {
        const warehouse = await warehouseV1Factory.make({ product: product });
        return warehouse;
      }),
    );

    await warehouseV1Repository.save(warehouses);
  }
}
