import { Lot } from 'src/modules/tenant/lot/entities/lot.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity({ name: 'supplier' })
export class Supplier {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', {
    name: 'name',
    length: 100,
    unique: true,
    nullable: false,
    comment: '공급처명',
  })
  name!: string;

  @OneToMany(() => Lot, (lot) => lot.supplier)
  lots!: Relation<Lot>[];
}
