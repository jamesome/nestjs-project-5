import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/modules/base-entity';
import { ProductV1 } from 'src/modules/tenant/product/v1/entities/productV1.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
  AfterInsert,
} from 'typeorm';

@Entity({ name: 'options' })
export class OptionV1 extends BaseEntity<OptionV1> {
  @Exclude()
  @Column({ name: 'name', comment: '옵션명' })
  name!: string;

  @Column({ name: 'size', comment: '사이즈' })
  size!: string;

  @Column({ name: 'color', comment: '색상' })
  color!: string;

  @ManyToOne(() => ProductV1, (product) => product.options, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  product!: Relation<ProductV1>;

  @AfterInsert()
  logInsert() {
    console.log('Option에 insert가 완료되었습니다.');
  }
}
