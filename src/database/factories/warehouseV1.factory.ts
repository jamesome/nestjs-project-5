import { Warehouse } from 'src/modules/tenant/warehouse/v1/entities/warehouse.entity';
import { setSeederFactory } from 'typeorm-extension';

export const WarehouseFactory = setSeederFactory(Warehouse, (faker) => {
  const warehouse = new Warehouse();
  warehouse.name = faker.person.fullName();

  return warehouse;
});
