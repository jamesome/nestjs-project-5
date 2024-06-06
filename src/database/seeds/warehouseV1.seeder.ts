import { Warehouse } from 'src/modules/tenant/warehouse/v1/entities/warehouse.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class WarehouseSeeder implements Seeder {
  async run(
    _dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.log('\n\nWarehouseSeeder\n\n');
    // const warehouseRepository = dataSource.getRepository(Warehouse);

    // const productFactory = factoryManager.get(Product);
    const warehouseFactory = factoryManager.get(Warehouse);

    await warehouseFactory.saveMany(2);
    // const products = await productFactory.saveMany(2);

    // const warehouses = await Promise.all(
    //   products.map(async (product: Product) => {
    //     const warehouse = await warehouseFactory.make({ product: product });
    //     return warehouse;
    //   }),
    // );

    // await warehouseRepository.save(warehouses);
  }
}
