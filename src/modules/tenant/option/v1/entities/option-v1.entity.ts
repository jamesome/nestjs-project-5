import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/modules/base-entity';
import { ProductV1 } from 'src/modules/tenant/product/v1/entities/productV1.entity';
import { Entity, Column, ManyToOne, JoinColumn, Relation } from 'typeorm';

@Entity({ name: 'options' })
export class OptionV1 extends BaseEntity {
  @Exclude()
  @Column({ name: 'name', comment: '옵션명' })
  name!: string;

  @Column({ name: 'size', comment: '사이즈' })
  size?: string;

  @Column({ name: 'color', comment: '색상' })
  color?: string;

  @Column({ name: 'product_id' })
  productId!: number;

  @ManyToOne(() => ProductV1)
  @JoinColumn({ name: 'product_id' })
  productV1!: Relation<ProductV1>;
}
