import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { TimestampedTable } from '../timestamped-table';

export class CreateTableItemCode1717563743161 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new TimestampedTable({
        name: 'item_code',
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
            name: 'item_id',
            type: 'int',
            isNullable: false,
            comment: '(FK) item 외래키',
          },
          {
            name: 'code',
            type: 'varchar',
            length: '100',
            isNullable: false,
            isUnique: true,
            comment: 'item의 코드(바코드, QR코드, RFID 등)',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'item_code',
      new TableForeignKey({
        name: 'FK_item_code_item_id', // 외래 키 제약 조건 이름
        columnNames: ['item_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'item', // 외래 키가 참조할 테이블
        onDelete: 'CASCADE', // 연결된 행이 삭제될 때의 동작
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('item_code', 'FK_item_code_item_id');
    await queryRunner.dropTable('item_code');
  }
}
