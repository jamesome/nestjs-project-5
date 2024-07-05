import { Expose } from 'class-transformer';
import { Category, InputType } from 'src/modules/enum';
import { Item } from 'src/modules/item/entities/item.entity';
import { Location } from 'src/modules/location/entities/location.entity';
import { Lot } from 'src/modules/lot/entities/lot.entity';
import { OperationType } from 'src/modules/operation-type/entities/operation-type.entity';
import { Supplier } from 'src/modules/supplier/entities/supplier.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Item, (item) => item.transactions)
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

  @Column({
    type: 'enum',
    enum: Category,
    name: 'category',
    nullable: false,
    comment: '구분. 입고 | 출고 | 이동',
  })
  category!: Category;

  @Expose({ name: 'input_type' })
  @Column({
    type: 'enum',
    enum: InputType,
    name: 'input_type',
    nullable: false,
    comment: '입고 유형. incoming(개별입고)...',
  })
  inputType!: InputType;

  @Column('int', {
    name: 'quantity',
    nullable: false,
    comment: '입고, 출고, 이동 된 재고 수량',
  })
  quantity!: number;

  @Column('text', {
    name: 'remark',
    nullable: true,
    comment: '비고',
  })
  remark?: string | null;

  // TODO: 추후, User로 대체
  @Expose({ name: 'create_worker' })
  @Column('varchar', {
    name: 'create_worker',
    length: 50,
    comment: '창고 등록 작업자',
  })
  createWorker!: string;

  @Expose({ name: 'created_at' })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Expose({ name: 'updated_at' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date | null = null;
}
