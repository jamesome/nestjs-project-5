import { Expose } from 'class-transformer';
import { Lot } from 'src/modules/lot/entities/lot.entity';
import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
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

  @Expose()
  @OneToMany(() => Transaction, (transaction) => transaction.supplier)
  transactions!: Relation<Transaction>[];
}
