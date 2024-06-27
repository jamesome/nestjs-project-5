import { ItemCode } from 'src/modules/tenant/item-code/v1/entities/item-code.entity';
import { Item } from 'src/modules/tenant/item/v1/entities/item.entity';
// import { Supplier } from 'src/modules/tenant/supplier/v1/entities/supplier.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class ItemSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const itemCodeRepository = dataSource.getRepository(ItemCode);
    // const supplierRepository = dataSource.getRepository(Supplier);

    const itemCodeFactory = factoryManager.get(ItemCode);
    // const supplierFactory = factoryManager.get(Supplier);
    const itemFactory = factoryManager.get(Item);

    const items = await itemFactory.saveMany(10);

    await Promise.all(
      items.map(async (item) => {
        const itemCodes: ItemCode[] = [];
        for (let i = 0; i < 5; i++) {
          const itemCode = await itemCodeFactory.make({ item });
          itemCodes.push(itemCode);
        }

        // const suppliers: Supplier[] = [];
        // for (let i = 0; i < 2; i++) {
        //   const supplier = await supplierFactory.make({ item });
        //   suppliers.push(supplier);
        // }

        await Promise.all([
          itemCodeRepository.save(itemCodes),
          // supplierRepository.save(suppliers),
        ]);
      }),
    );
  }
}
