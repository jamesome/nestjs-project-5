// import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/modules/base-entity';
import { ProductV1 } from 'src/modules/tenant/product/v1/entities/productV1.entity';
import { Entity, Column, OneToOne, Relation, JoinColumn } from 'typeorm';

@Entity({ name: 'warehouse' })
export class WarehouseV1 extends BaseEntity<WarehouseV1> {
  // @Exclude()
  @Column({ name: 'name', comment: '창고명' })
  name!: string;

  @OneToOne(() => ProductV1, { cascade: true })
  @JoinColumn({ name: 'product_id' }) // FK를 갖는 테이블에 설정
  product!: Relation<ProductV1>;
}
