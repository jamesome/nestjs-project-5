import { VirtualColumn } from 'src/common/decorators/virtual-column.decorator';
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
  @VirtualColumn({ type: 'number' })
  quantityTotal?: number;

  @VirtualColumn({ type: 'number' })
  quantityAvailable?: number;

  @VirtualColumn({ type: 'number' })
  quantityNonAvailable?: number;

  @VirtualColumn({ type: 'object' })
  quantityByZone?: object;

  @VirtualColumn({ type: 'object' })
  quantityByStatusInZone?: object;
}
