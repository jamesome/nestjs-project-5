import { ProductV1 } from 'src/modules/tenant/product/v1/entities/productV1.entity';
// import { WarehouseV1 } from 'src/modules/tenant/warehouse/v1/entities/warehouse-v1.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class WarehouseV1Seeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.log('\nStart WarehouseV1Seeder------------------------\n');
    const productV1Repository = dataSource.getRepository(ProductV1);
    await productV1Repository.save([
      {
        name: 'cat1',
      },
    ]);
    console.log(productV1Repository.findOne);
    console.log('\nEnd WarehouseV1Seeder------------------------\n');
    const productV1Factory = factoryManager.get(ProductV1);
    await productV1Factory.save();
    // await productV1Repository.find();

    // const warehouseV1Repository = dataSource.getRepository(WarehouseV1);

    // warehouseV1Repository.make({ ProductV1 });

    // const warehouseV1Factory = factoryManager.get(WarehouseV1);
    // const productV1Factory = factoryManager.get(ProductV1);

    // const product = warehouseV1Factory.make({ ProductV1: productV1Factory });

    // await warehouseV1Factory.save(product);
    // await productV1Factory.saveMany(1);
  }
}
