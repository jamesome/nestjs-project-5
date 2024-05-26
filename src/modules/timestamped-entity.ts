import {
  // BaseEntity as TypeORMBaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
} from 'typeorm';

export abstract class TimestampedEntity extends BaseEntity {
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
}
