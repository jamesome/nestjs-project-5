import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
} from 'typeorm';
import { Item } from '../../item/v1/entities/item.entity';

@Entity({ name: 'item_serial' })
@Unique(['serialNo'])
export class ItemSerial {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Item, (item) => item.itemSerials)
  @JoinColumn({ name: 'item_id' })
  item!: Relation<Item>;

  @Column({ name: 'item_id' })
  @Expose({ name: 'item_id' })
  itemId!: number;

  @Expose({ name: 'serial_no' })
  @Column('varchar', {
    name: 'serial_no',
    length: 50,
    unique: true,
    nullable: false,
    comment: 'Serial Number',
  })
  serialNo?: string;
}
