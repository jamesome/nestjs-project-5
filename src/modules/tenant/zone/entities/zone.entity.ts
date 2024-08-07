import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
} from 'typeorm';
import { TimestampedEntity } from 'src/modules/timestamped-entity';
import { Expose } from 'class-transformer';
import { Warehouse } from '../../warehouse/entities/warehouse.entity';
import { Location } from '../../location/entities/location.entity';

@Entity({ name: 'zone' })
@Unique(['code'])
export class Zone extends TimestampedEntity {
  @Expose()
  @PrimaryGeneratedColumn()
  id!: number;

  @Expose()
  @ManyToOne(() => Warehouse, (warehouse) => warehouse.zones)
  @JoinColumn({ name: 'warehouse_id' })
  warehouse!: Relation<Warehouse>;

  @Expose({ name: 'warehouse_id' })
  @Column({ name: 'warehouse_id' })
  warehouseId!: number;

  @Expose()
  @Column('varchar', {
    name: 'name',
    length: 100,
    unique: true,
    nullable: false,
    comment: '분류명',
  })
  name!: string;

  @Expose()
  @Column('varchar', {
    name: 'code',
    length: 100,
    unique: true,
    nullable: true,
    comment: '분류코드',
  })
  code?: string | null;

  @Expose({ name: 'is_default' })
  @Column('tinyint', {
    name: 'is_default',
    nullable: true,
    comment: '기본 창고 여부',
  })
  isDefault!: number;

  @OneToMany(() => Location, (location) => location.zone, {
    cascade: true,
  })
  locations?: Relation<Location>[];
}
