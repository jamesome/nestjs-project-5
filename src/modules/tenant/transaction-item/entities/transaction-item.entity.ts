import { Expose } from 'class-transformer';
import { Item } from '../../item/entities/item.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Location } from '../../location/entities/location.entity';
import { Lot } from '../../lot/entities/lot.entity';
import { Supplier } from '../../supplier/v1/entities/supplier.entity';
import { OperationType } from '../../operation-type/entities/operation-type.entity';
import { StockStatus } from '../../enum';
import { Transaction } from '../../transaction/entities/transaction.entity';

@Entity('transaction_item')
export class TransactionItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Transaction, (transaction) => transaction.transactionItems)
  @JoinColumn({ name: 'transaction_id' })
  transaction!: Relation<Transaction>;

  @Expose({ name: 'transaction_id' })
  @Column({
    name: 'transaction_id',
    nullable: false,
    comment: '(FK) 품목 일련번호',
  })
  transactionId!: number;

  @ManyToOne(() => Item, (item) => item.transactionItems)
  @JoinColumn({ name: 'item_id' })
  item!: Relation<Item>;

  @Expose({ name: 'item_id' })
  @Column({
    name: 'item_id',
    nullable: false,
    comment: '(FK) 품목 일련번호',
  })
  itemId!: number;

  @Expose({ name: 'location_departure' })
  @ManyToOne(
    () => Location,
    (location) => location.transactions_locationDeparture,
  )
  @JoinColumn({ name: 'location_departure_id' })
  locationDeparture!: Relation<Location>;

  @Expose({ name: 'location_departure_id' })
  @Column('int', {
    name: 'location_departure_id',
    nullable: true,
    comment: '(FK) 출발 location',
  })
  locationDepartureId?: number | null;

  @Expose({ name: 'location_arrival' })
  @ManyToOne(
    () => Location,
    (location) => location.transactions_locationArrival,
  )
  @JoinColumn({ name: 'location_arrival_id' })
  locationArrival!: Relation<Location>;

  @Expose({ name: 'location_arrival_id' })
  @Column('int', {
    name: 'location_arrival_id',
    nullable: true,
    comment: '(FK) 도착 location',
  })
  locationArrivalId?: number | null;

  @ManyToOne(() => Lot, (lot) => lot.transactions)
  @JoinColumn({ name: 'lot_id' })
  lot!: Relation<Lot>;

  @Expose({ name: 'lot_id' })
  @Column('int', {
    name: 'lot_id',
    nullable: true,
    comment: '(FK) Lot 일련번호',
  })
  lotId?: number | null;

  @ManyToOne(() => Supplier, (supplier) => supplier.transactions)
  @JoinColumn({ name: 'supplier_id' })
  supplier!: Relation<Supplier>;

  @Expose({ name: 'supplier_id' })
  @Column({
    name: 'supplier_id',
    nullable: true,
    comment: '(FK) 공급처 일련번호',
  })
  supplierId?: number | null;

  @Expose({ name: 'operation_type' })
  @ManyToOne(() => OperationType, (operationType) => operationType.transactions)
  @JoinColumn({ name: 'operation_type_id' })
  operationType!: Relation<OperationType>;

  @Expose({ name: 'operation_type_id' })
  @Column('int', {
    name: 'operation_type_id',
    nullable: true,
    comment: '재고작업구분 일련번호',
  })
  operationTypeId!: number;

  @Column('int', {
    name: 'quantity',
    nullable: false,
    comment: '입고, 출고, 이동 된 재고 수량',
  })
  quantity!: number;

  @Column({
    type: 'enum',
    enum: StockStatus,
    name: 'status',
    nullable: false,
    default: StockStatus.NORMAL,
    comment: '재고상태. normal => 정상, abnormal => 비정상, disposed => 폐기',
  })
  status!: StockStatus;

  @Column('text', {
    name: 'remark',
    nullable: true,
    comment: '비고',
  })
  remark?: string | null;
}
