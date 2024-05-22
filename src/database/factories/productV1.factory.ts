import { setSeederFactory } from 'typeorm-extension';
import { ProductV1 } from 'src/modules/tenant/product/v1/entities/productV1.entity';

export default setSeederFactory(ProductV1, (faker) => {
  const productV1 = new ProductV1();
  productV1.name = faker.commerce.product();

  return productV1;
});
