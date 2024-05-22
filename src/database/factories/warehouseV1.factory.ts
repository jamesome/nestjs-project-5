import { setSeederFactory } from 'typeorm-extension';
import { WarehouseV1 } from 'src/modules/tenant/warehouse/v1/entities/warehouse-v1.entity';

export const WarehouseV1Factory = setSeederFactory(WarehouseV1, (faker) => {
  const warehouseV1 = new WarehouseV1();
  warehouseV1.name = faker.person.fullName();

  return warehouseV1;
});
