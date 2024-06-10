import { Expose } from 'class-transformer';
import { Item } from 'src/modules/tenant/item/v1/entities/item.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity({ name: 'supplier' })
export class Supplier {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Item, (item) => item.suppliers)
  @JoinColumn({ name: 'item_id' })
  item!: Relation<Item>;

  @Column({ name: 'item_id' })
  @Expose({ name: 'item_id' })
  itemId!: number;

  @Column('varchar', {
    name: 'name',
    length: 100,
    unique: true,
    nullable: false,
    comment: '공급처명',
  })
  name!: string;
}
