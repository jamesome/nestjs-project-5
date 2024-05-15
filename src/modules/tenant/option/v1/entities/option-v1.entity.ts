import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/modules/base-entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'options' })
export class OptionV1 extends BaseEntity {
  @Exclude()
  @Column({ name: 'name', comment: '옵션명' })
  name!: string;

  @Column({ name: 'size', comment: '사이즈' })
  size?: string;

  @Column({ name: 'color', comment: '색상' })
  color?: string;
}
