import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  Relation,
} from 'typeorm';
import { TimestampedEntity } from 'src/modules/timestamped-entity';
import { StockStatus } from './enum';
import { Expose } from 'class-transformer';
import { Zone } from 'src/modules/tenant/zone/v1/entities/zone.entity';

@Entity({ name: 'location' })
export class Location extends TimestampedEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Zone, (zone) => zone.locations, { eager: true })
  @JoinColumn({ name: 'zone_id' })
  zone!: Relation<Zone>;

  @Expose({ name: 'zone_id' })
  @Column({ name: 'zone_id' })
  zoneId!: number;

  @Column('varchar', {
    name: 'name',
    length: 100,
    unique: true,
    nullable: false,
    comment: '로케이션명',
  })
  name!: string;

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

  @Column('text', {
    name: 'remark',
    nullable: true,
    comment: '비고',
  })
  remark?: string;

  @Expose({ name: 'create_worker' })
  @Column('varchar', {
    name: 'create_worker',
    length: 50,
    comment: '창고 등록 작업자',
  })
  createWorker?: string;
}
