import { OptionV1 } from 'src/modules/tenant/option/v1/entities/option-v1.entity';
import { ProductV1 } from 'src/modules/tenant/product/v1/entities/productV1.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class OptionV1Seeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.log('\n\nOptionV1Seeder\n\n');
    const optionV1Repository = dataSource.getRepository(ProductV1);

    const productV1Factory = factoryManager.get(ProductV1);
    const optionV1Factory = factoryManager.get(OptionV1);

    const product = await productV1Factory.save();

    const options = await Promise.all(
      Array(3)
        .fill('')
        .map(async () => {
          const made = await optionV1Factory.make({
            product,
          });
          return made;
        }),
    );

    await optionV1Repository.save(options);
  }
}
