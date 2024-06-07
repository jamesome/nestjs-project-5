import { Expose } from 'class-transformer';
import { ItemCode } from 'src/modules/item-code/entities/item-code.entity';
import { ItemLocation } from 'src/modules/item-location/entities/item-location.entity';
import { Supplier } from 'src/modules/supplier/entities/supplier.entity';
import { TimestampedEntity } from 'src/modules/timestamped-entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity({ name: 'item' })
export class Item extends TimestampedEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', {
    name: 'name',
    length: 200,
    unique: true,
    nullable: false,
    comment: '품목명',
  })
  name!: string;

  @Column('varchar', {
    name: 'property',
    length: 200,
    nullable: false,
    comment: '품목속성 (셀메이트 옵션명)',
  })
  property?: string;

  @OneToMany(() => ItemCode, (itemCode) => itemCode.item, {
    eager: true,
    cascade: true,
  })
  itemCodes!: Relation<ItemCode>[];

  @OneToMany(() => Supplier, (supplier) => supplier.item, {
    eager: true,
    cascade: true,
  })
  suppliers!: Relation<Supplier>[];

  @OneToMany(() => ItemLocation, (itemLocation) => itemLocation.item, {
    eager: true,
    cascade: true,
  })
  itemLocations!: Relation<ItemLocation>[];

  @Expose({ name: 'total_quantity' })
  totalQuantity?: number;
}
