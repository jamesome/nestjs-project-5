import { ProductV1 } from 'src/modules/tenant/product/v1/entities/productV1.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class ProductV1Seeder implements Seeder {
  async run(
    _dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.log('\n\nProductV1Seeder\n\n');
    const productV1Factory = factoryManager.get(ProductV1);
    await productV1Factory.save();
    // await productV1Factory.saveMany(1);
  }
}
