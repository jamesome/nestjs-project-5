import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { StockStatus } from 'src/modules/location/entities/enum';
import { Item } from 'src/modules/item/entities/item.entity';
import { Location } from 'src/modules/location/entities/location.entity';

@Entity({ name: 'item_location' })
export class ItemLocation {
  @ManyToOne(() => Item, (item) => item.itemLocations)
  @JoinColumn({ name: 'item_id' })
  item!: Relation<Item>;

  @PrimaryColumn({ name: 'item_id' })
  @Expose({ name: 'item_id' })
  itemId!: number;

  @ManyToOne(() => Location, (zone) => zone.itemLocations)
  @JoinColumn({ name: 'location_id' })
  location!: Relation<Location>;

  @PrimaryColumn({ name: 'location_id' })
  @Expose({ name: 'location_id' })
  locationId!: number;

  @Column('int', {
    name: 'quantity',
    unique: true,
    nullable: false,
    comment: '바코드1 ~ 3, 글로벌 바코드',
  })
  quantity!: number;

  @Column({
    type: 'enum',
    enum: StockStatus,
    name: 'status',
    nullable: false,
    default: StockStatus.NORMAL,
    comment: '재고상태. normal => 정상, abnormal => 비정상, disposed => 폐기',
  })
  status!: StockStatus;
}
