// import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';
import { BaseEntity } from 'src/modules/base-entity';
import { Entity, Column, AfterInsert } from 'typeorm';

@Entity({ name: 'product' })
export class ProductV1 extends BaseEntity<ProductV1> {
  @Column({ name: 'name', comment: '상품명' })
  @IsString()
  name!: string;

  // @OneToMany(() => OptionV1, (option) => option.product, {
  //   cascade: true,
  //   eager: true,
  // })
  // options!: Relation<OptionV1>[];

  @AfterInsert()
  logInsert() {
    console.log('Product에 insert가 완료되었습니다.');
  }
}
