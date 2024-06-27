import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { TimestampedTable } from '../timestamped-table';
import { StockStatus } from 'src/modules/tenant/enum';

export class CreateTableLocation1716940630213 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new TimestampedTable({
        name: 'location',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
          },
          {
            name: 'zone_id',
            type: 'int',
            isNullable: false,
            comment: '(FK) zone 외래키',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
            isUnique: true,
            comment: '로케이션명',
          },
          {
            name: 'stock_status',
            type: 'enum',
            isNullable: false,
            enum: Object.values(StockStatus),
            comment: '재고상태. normal(정상), abnormal(비정상), disposed(폐기)',
          },
          {
            name: 'remark',
            type: 'text',
            isNullable: true,
            comment: '비고',
          },
          {
            name: 'create_worker',
            type: 'varchar',
            length: '50',
            isNullable: false,
            comment: '로케이션 등록 작업자',
          },
          {
            name: 'default',
            type: 'tinyInt',
            isNullable: false,
            comment: '기본 로케이션 여부',
            default: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'location',
      new TableForeignKey({
        name: 'FK_location_zone_id', // 외래 키 제약 조건 이름
        columnNames: ['zone_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'zone', // 외래 키가 참조할 테이블
        onDelete: 'CASCADE', // 연결된 행이 삭제될 때의 동작
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('location', 'FK_location_zone_id');
    await queryRunner.dropTable('location');
  }
}
