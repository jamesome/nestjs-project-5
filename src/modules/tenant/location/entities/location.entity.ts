import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  Relation,
  OneToMany,
} from 'typeorm';
import { TimestampedEntity } from 'src/modules/timestamped-entity';
import { Expose } from 'class-transformer';
import { Zone } from '../../zone/entities/zone.entity';
import { StockStatus } from '../../enum';
import { InventoryItem } from '../../inventory-item/entities/inventory-item.entity';
import { TransactionItem } from '../../transaction-item/entities/transaction-item.entity';

@Entity({ name: 'location' })
export class Location extends TimestampedEntity {
  @Expose()
  @PrimaryGeneratedColumn()
  id!: number;

  @Expose()
  @ManyToOne(() => Zone, (zone) => zone.locations)
  @JoinColumn({ name: 'zone_id' })
  zone!: Relation<Zone>;

  @Expose({ name: 'zone_id' })
  @Column({ name: 'zone_id' })
  zoneId!: number;

  @Expose()
  @Column('varchar', {
    name: 'name',
    length: 100,
    unique: true,
    nullable: false,
    comment: '로케이션명',
  })
  name!: string;

  // TODO: 삭제 예정 재고상태 Location => inventoryItem으로 변동
  @Expose({ name: 'stock_status' })
  @Column({
    type: 'enum',
    enum: StockStatus,
    name: 'stock_status',
    nullable: false,
    default: StockStatus.NORMAL,
    comment: '재고상태. normal => 정상, abnormal => 비정상, disposed => 폐기',
  })
  stockStatus?: StockStatus;

  @Expose()
  @Column('text', {
    name: 'remark',
    nullable: true,
    comment: '비고',
  })
  remark?: string;

  // TODO: 추후, User로 대체
  @Expose({ name: 'create_worker' })
  @Column('varchar', {
    name: 'create_worker',
    length: 50,
    comment: '창고 등록 작업자',
  })
  createWorker?: string;

  @Expose({ name: 'is_default' })
  @Column('tinyint', {
    name: 'is_default',
    nullable: true,
    comment: '기본 창고 여부',
  })
  isDefault!: number;

  @OneToMany(() => InventoryItem, (inventoryItem) => inventoryItem.location)
  inventoryItems!: Relation<InventoryItem>[];

  @OneToMany(
    () => TransactionItem,
    (transactionItem) => transactionItem.locationDeparture,
  )
  transactions_locationDeparture!: Relation<TransactionItem>[];

  @OneToMany(
    () => TransactionItem,
    (transactionItem) => transactionItem.locationArrival,
  )
  transactions_locationArrival!: Relation<TransactionItem>[];
}
