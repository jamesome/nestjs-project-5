import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Item } from '../../item/v1/entities/item.entity';
import { Supplier } from '../../supplier/v1/entities/supplier.entity';
import { InventoryItem } from '../../inventory-item/entities/inventory-item.entity';
import { InventoryTransaction } from '../../inventory-transaction/entities/inventory-transaction.entity';

@Entity({ name: 'lot' })
@Index(['supplierId', 'number'], { unique: true }) // 유니크 => [공급처 + 로트넘버]
export class Lot {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Item, (item) => item.lots)
  @JoinColumn({ name: 'item_id' })
  item!: Relation<Item>;

  @Expose({ name: 'item_id' })
  @Column({ name: 'item_id' })
  itemId!: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.lots, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'supplier_id' })
  supplier!: Relation<Supplier>;

  @Expose({ name: 'supplier_id' })
  @Column({
    name: 'supplier_id',
    nullable: false,
    comment: '(FK) 공급처 일련번호',
  })
  supplierId!: number;

  @Column('varchar', {
    name: 'number',
    length: 50,
    nullable: false,
    comment: '로트 넘버',
  })
  number!: string;

  @Expose({ name: 'expiration_date' })
  @Column({
    type: 'timestamp',
    name: 'expiration_date',
    nullable: true,
    comment: '유통기한',
  })
  expirationDate?: Date | null = null;

  @OneToMany(() => InventoryItem, (inventoryItem) => inventoryItem.lot)
  inventoryItems!: Relation<InventoryItem>[];

  @OneToMany(
    () => InventoryTransaction,
    (inventoryTransaction) => inventoryTransaction.lot,
  )
  inventoryTransactions!: Relation<InventoryTransaction>[];
}
