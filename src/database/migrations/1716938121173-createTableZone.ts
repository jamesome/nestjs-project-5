import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { TimestampedTable } from '../timestamped-table';

export class CreateTableZone1716938121173 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new TimestampedTable({
        name: 'zone',
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
            name: 'warehouse_id',
            type: 'int',
            isNullable: false,
            comment: '(FK) warehouse 외래키',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
            isUnique: true,
            comment: '분류(zone)명',
          },
          {
            name: 'code',
            type: 'varchar',
            length: '100',
            isNullable: true,
            isUnique: true,
            comment: '분류(zone)코드',
          },
          {
            name: 'default',
            type: 'tinyInt',
            isNullable: false,
            comment: '기본 분류 여부',
            default: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'zone',
      new TableForeignKey({
        name: 'FK_zone_warehouse_id', // 외래 키 제약 조건 이름
        columnNames: ['warehouse_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'warehouse', // 외래 키가 참조할 테이블
        onDelete: 'CASCADE', // 연결된 행이 삭제될 때의 동작
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('zone', 'FK_zone_warehouse_id');
    await queryRunner.dropTable('zone');
  }
}
