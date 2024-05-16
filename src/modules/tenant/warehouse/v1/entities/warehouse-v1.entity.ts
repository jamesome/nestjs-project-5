import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/modules/base-entity';
import { ProductV1 } from 'src/modules/tenant/product/v1/entities/productV1.entity';
import { Entity, Column, OneToOne, Relation, PrimaryColumn } from 'typeorm';

@Entity({ name: 'warehouse' })
export class WarehouseV1 extends BaseEntity {
  @Exclude()
  @Column({ name: 'name', comment: '창고명' })
  name!: string;

  @OneToOne(() => ProductV1)
  product!: Relation<ProductV1>[];

  @PrimaryColumn()
  @Column({ name: 'product_id' })
  productId!: number;
}
