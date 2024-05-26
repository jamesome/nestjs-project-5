// import { Exclude } from 'class-transformer';
import { ProductV1 } from 'src/modules/tenant/product/v1/entities/productV1.entity';
import { TimestampedEntity } from 'src/modules/timestamped-entity';
import {
  Entity,
  Column,
  OneToOne,
  Relation,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'warehouse' })
export class WarehouseV1 extends TimestampedEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  // @Exclude()
  @Column({ name: 'name', comment: '창고명' })
  name!: string;

  @OneToOne(() => ProductV1, { cascade: true })
  @JoinColumn({ name: 'product_id' }) // FK를 갖는 테이블에 설정
  product!: Relation<ProductV1>;
}
