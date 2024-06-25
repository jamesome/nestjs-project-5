import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableItemSerial1718071571868 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'item_serial',
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
            name: 'serial_no',
            type: 'varchar',
            length: '50',
            isNullable: false,
            isUnique: true,
            comment: '제품의 고유 번호',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'item_serial',
      new TableForeignKey({
        name: 'FK_item_serial_item_id', // 외래 키 제약 조건 이름
        columnNames: ['item_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'item', // 외래 키가 참조할 테이블
        onDelete: 'CASCADE', // 연결된 행이 삭제될 때의 동작
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('item_serial', 'FK_item_serial_item_id');
    await queryRunner.dropTable('item_serial');
  }
}
