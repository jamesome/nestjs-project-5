import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Category, InputType } from '../../enum';
import { TransactionItem } from '../../transaction-item/entities/transaction-item.entity';

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

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

  @Expose({ name: 'transaction_items' })
  @OneToMany(
    () => TransactionItem,
    (transactionItem) => transactionItem.transaction,
  )
  transactionItems!: Relation<TransactionItem>[];
}
