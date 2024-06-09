import { SelectQueryBuilder } from 'typeorm';
import 'reflect-metadata';

declare module 'typeorm' {
  interface SelectQueryBuilder<Entity> {
    getItemMany(
      this: SelectQueryBuilder<Entity>,
    ): Promise<Entity[] | undefined>;
  }
}

SelectQueryBuilder.prototype.getItemMany = async function () {
  const { entities, raw } = await this.getRawAndEntities();
  let flag = 0;
  let idx = 0;

  const items = entities.map((entity) => {
    while (flag === raw[idx]['item_id']) {
      idx++;
    }

    const item = raw[idx];

    entity['total_quantity'] = Number(item['total_quantity']);
    entity['available_quantity'] = Number(item['available_quantity']);
    entity['non_available_quantity'] = Number(item['non_available_quantity']);

    flag = item['item_id'];
    return entity;
  });

  return [...items];
};
