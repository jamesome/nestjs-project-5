import { setSeederFactory } from 'typeorm-extension';
import { OptionV1 } from 'src/modules/tenant/option/v1/entities/option-v1.entity';

export const OptionV1Factory = setSeederFactory(OptionV1, (faker) => {
  const optionV1 = new OptionV1();
  optionV1.name = faker.person.fullName();
  optionV1.size = faker.color.human();
  optionV1.color = faker.color.human();

  return optionV1;
});
