// import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';
import { OptionV1 } from 'src/modules/tenant/option/v1/entities/option-v1.entity';
import { TimestampedEntity } from 'src/modules/timestamped-entity';
import {
  Entity,
  Column,
  AfterInsert,
  OneToMany,
  Relation,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'product' })
export class ProductV1 extends TimestampedEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'name', comment: '상품명' })
  @IsString()
  name!: string;

  @OneToMany(() => OptionV1, (option) => option.product, {
    cascade: true,
  })
  options!: Relation<OptionV1>[];

  @AfterInsert()
  logInsert() {
    console.log('Product에 insert가 완료되었습니다.');
  }
}
