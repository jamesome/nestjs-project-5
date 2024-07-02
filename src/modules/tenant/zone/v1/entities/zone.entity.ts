import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Warehouse } from 'src/modules/tenant/warehouse/v1/entities/warehouse.entity';
import { Location } from 'src/modules/tenant/location/v1/entities/location.entity';

@Entity({ name: 'zone' })
export class Zone {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.zones, { eager: true })
  @JoinColumn({ name: 'warehouse_id' })
  warehouse!: Relation<Warehouse>;

  @Column({ name: 'warehouse_id' })
  @Expose({ name: 'warehouse_id' })
  warehouseId!: number;

  @Column('varchar', {
    name: 'name',
    length: 100,
    unique: true,
    nullable: false,
    comment: '분류명',
  })
  name!: string;

  @Column('varchar', {
    name: 'code',
    length: 100,
    unique: true,
    nullable: true,
    comment: '분류코드',
  })
  code?: string | null;

  @OneToMany(() => Location, (location) => location.zone, {
    cascade: true,
  })
  locations?: Relation<Location>[];
}
