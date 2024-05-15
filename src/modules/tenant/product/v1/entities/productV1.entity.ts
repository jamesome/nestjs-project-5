// import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/modules/base-entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'product' })
export class ProductV1 extends BaseEntity {
  @Column({ name: 'name', comment: '상품명' })
  name!: string;
}
