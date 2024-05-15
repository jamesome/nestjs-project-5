import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/modules/base-entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class WarehouseV1 extends BaseEntity {
  @Exclude()
  @Column({ name: 'name', comment: '창고명' })
  name!: string;
}
