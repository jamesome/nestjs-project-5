// import { Exclude } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';
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

  @Column({ name: 'brand', comment: '브랩드명' })
  @IsString()
  brand!: string;

  @Column({ name: 'supply', comment: '공급처' })
  @IsString()
  supply!: string;

  @Column({ name: 'active', comment: '등록상태' })
  @IsBoolean()
  active!: string;

  @OneToMany(() => OptionV1, (option) => option.product, {
    cascade: true,
  })
  options!: Relation<OptionV1>[];

  @AfterInsert()
  logInsert() {
    console.log('Product에 insert가 완료되었습니다.');
  }
}
