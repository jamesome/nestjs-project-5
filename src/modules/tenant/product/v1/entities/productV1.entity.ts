// import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';
import { BaseEntity } from 'src/modules/base-entity';
import { WarehouseV1 } from 'src/modules/tenant/warehouse/v1/entities/warehouse-v1.entity';
import { Entity, Column, Relation, AfterInsert, OneToOne } from 'typeorm';

@Entity({ name: 'product' })
export class ProductV1 extends BaseEntity {
  @Column({ name: 'name', comment: '상품명' })
  @IsString()
  name!: string;

  // @OneToMany(() => OptionV1, (option) => option.product, {
  //   cascade: true,
  //   eager: true,
  // })
  // options!: Relation<OptionV1>[];

  @OneToOne(() => WarehouseV1, '', {
    cascade: true,
    eager: true,
  })
  warehouse!: Relation<WarehouseV1>[];

  @AfterInsert()
  logInsert() {
    console.log('Product에 insert가 완료되었습니다.');
  }
}
