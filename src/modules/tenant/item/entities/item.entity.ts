import { VirtualColumn } from 'src/common/decorators/virtual-column.decorator';
import { TimestampedEntity } from 'src/modules/timestamped-entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ItemCode } from '../../item-code/entities/item-code.entity';
import { InventoryItem } from '../../inventory-item/entities/inventory-item.entity';
import { ItemSerial } from '../../item-serial/entities/item-serial.entity';
import { Lot } from '../../lot/entities/lot.entity';
import { TransactionItem } from '../../transaction-item/entities/transaction-item.entity';

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

  @Expose({ name: 'item_codes' })
  @OneToMany(() => ItemCode, (itemCode) => itemCode.item, {
    eager: true,
    cascade: true,
  })
  itemCodes!: Relation<ItemCode>[];

  @Expose({ name: 'inventory_items' })
  @OneToMany(() => InventoryItem, (inventoryItem) => inventoryItem.item)
  inventoryItems!: Relation<InventoryItem>[];

  @Expose({ name: 'item_serials' })
  @OneToMany(() => ItemSerial, (itemSerial) => itemSerial.item, {
    eager: true,
    cascade: true,
  })
  itemSerials!: Relation<ItemSerial>[];

  @OneToMany(() => Lot, (lot) => lot.item)
  lots!: Relation<Lot>[];

  @OneToMany(() => TransactionItem, (transactionItem) => transactionItem.item)
  transactionItems!: Relation<TransactionItem>[];

  // Virtual Entities
  @Expose({ name: 'quantity_total' })
  @VirtualColumn({ type: 'number' })
  quantityTotal?: number;

  @Expose({ name: 'quantity_available' })
  @VirtualColumn({ type: 'number' })
  quantityAvailable?: number;

  @Expose({ name: 'quantity_non_available' })
  @VirtualColumn({ type: 'number' })
  quantityNonAvailable?: number;

  @Expose({ name: 'quantity_by_zone' })
  @VirtualColumn({ type: 'object' })
  quantityByZone?: object;

  @Expose({ name: 'quantity_by_status_in_zone' })
  @VirtualColumn({ type: 'object' })
  quantityByStatusInZone?: object;
}
