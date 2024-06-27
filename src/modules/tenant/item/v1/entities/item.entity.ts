import { VirtualColumn } from 'src/common/decorators/virtual-column.decorator';
import { InventoryItem } from 'src/modules/tenant/inventory-item/entities/inventory-item.entity';
import { InventoryTransaction } from 'src/modules/tenant/inventory-transaction/entities/inventory-transaction.entity';
import { ItemCode } from 'src/modules/tenant/item-code/v1/entities/item-code.entity';
import { ItemSerial } from 'src/modules/tenant/item-serial/entities/item-serial.entity';
import { Lot } from 'src/modules/tenant/lot/entities/lot.entity';
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

  @OneToMany(() => InventoryItem, (inventoryItem) => inventoryItem.item, {
    eager: true,
    cascade: true,
  })
  inventoryItems!: Relation<InventoryItem>[];

  @OneToMany(() => ItemSerial, (itemSerial) => itemSerial.item, {
    eager: true,
    cascade: true,
  })
  itemSerials!: Relation<ItemSerial>[];

  @OneToMany(() => Lot, (lot) => lot.item, {
    // eager: true,
    cascade: true,
  })
  lots!: Relation<Lot>[];

  @OneToMany(
    () => InventoryTransaction,
    (inventoryTransaction) => inventoryTransaction.item,
    {
      cascade: true,
    },
  )
  inventoryTransactions!: Relation<InventoryTransaction>[];

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
