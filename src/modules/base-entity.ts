import {
  BaseEntity as TypeORMBaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class BaseEntity extends TypeORMBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date | null = null;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date | null = null;

  constructor(entity?: Partial<BaseEntity>) {
    super();

    if (entity) {
      Object.assign(this, entity);
    }
  }
}
