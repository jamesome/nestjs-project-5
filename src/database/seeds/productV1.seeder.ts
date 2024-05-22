import { ProductV1 } from 'src/modules/tenant/product/v1/entities/productV1.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class ProductV1Seeder implements Seeder {
  async run(
    _dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.log('ProductV1Seeder');
    const productFactory = factoryManager.get(ProductV1);
    await productFactory.save();
    // await productFactory.saveMany(1);
  }
}
