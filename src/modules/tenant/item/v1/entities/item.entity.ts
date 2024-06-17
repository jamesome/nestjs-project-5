import { ItemCode } from 'src/modules/tenant/item-code/v1/entities/item-code.entity';
import { ItemLocation } from 'src/modules/tenant/item-location/entities/item-location.entity';
import { ItemSerial } from 'src/modules/tenant/item-serial/entities/item-serial.entity';
import { Supplier } from 'src/modules/tenant/supplier/v1/entities/supplier.entity';
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

  @OneToMany(() => ItemSerial, (ItemSerial) => ItemSerial.item, {
    eager: true,
    cascade: true,
  })
  itemSerials!: Relation<ItemLocation>[];

  // Virtual Entities
  quantity_total?: number;
  quantity_available?: number;
  quantity_non_available?: number;
  quantity_by_zone?: object;
  quantity_by_status_in_zone?: object;
}
