import { StockStatus } from 'src/modules/tenant/enum';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableItemLocation1717728873268
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'item_location',
        columns: [
          {
            name: 'item_id',
            type: 'int',
            isNullable: false,
            comment: '(FK) item 외래키',
          },
          {
            name: 'location_id',
            type: 'int',
            isNullable: false,
            comment: '(FK) location 외래키',
          },
          {
            name: 'quantity',
            type: 'int',
            length: '100',
            isNullable: false,
            comment: '품목의 재고 수량',
          },
          {
            name: 'status',
            type: 'enum',
            isNullable: false,
            enum: Object.values(StockStatus),
            comment:
              '품목의 재고 상태. normal(정상), abnormal(비정상), disposed(폐기)',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'item_location',
      new TableForeignKey({
        name: 'FK_item_location_item_id', // 외래 키 제약 조건 이름
        columnNames: ['item_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'item', // 외래 키가 참조할 테이블
        onDelete: 'CASCADE', // 연결된 행이 삭제될 때의 동작
      }),
    );

    await queryRunner.createForeignKey(
      'item_location',
      new TableForeignKey({
        name: 'FK_item_location_location_id', // 외래 키 제약 조건 이름
        columnNames: ['location_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'location', // 외래 키가 참조할 테이블
        onDelete: 'CASCADE', // 연결된 행이 삭제될 때의 동작
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'item_location',
      'FK_item_location_location_id',
    );
    await queryRunner.dropForeignKey(
      'item_location',
      'FK_item_location_item_id',
    );
    await queryRunner.dropTable('item_location');
  }
}
