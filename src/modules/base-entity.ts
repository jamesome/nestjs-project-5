import {
  // BaseEntity as TypeORMBaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';

// export abstract class BaseEntity extends TypeORMBaseEntity {
export abstract class BaseEntity<T> {
  @PrimaryGeneratedColumn()
  id!: number;

  // constructor() {
  //   super();
  // }

  constructor(entity?: Partial<T>) {
    // super();

    // if (entity) {
    Object.assign(this, entity);
    // }
  }
}
