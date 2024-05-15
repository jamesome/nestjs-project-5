// import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';
import { BaseEntity } from 'src/modules/base-entity';
import { OptionV1 } from 'src/modules/tenant/option/v1/entities/option-v1.entity';
import { Entity, Column, OneToMany, Relation } from 'typeorm';

@Entity({ name: 'product' })
export class ProductV1 extends BaseEntity {
  @Column({ name: 'name', comment: '상품명' })
  @IsString()
  name!: string;

  @OneToMany(() => OptionV1, (optionV1) => optionV1.productV1, {
    cascade: true,
  })
  options!: Relation<OptionV1>[];
}