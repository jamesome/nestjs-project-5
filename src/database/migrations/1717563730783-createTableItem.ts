import { MigrationInterface, QueryRunner } from 'typeorm';
import { TimestampedTable } from '../timestamped-table';

export class CreateTableItem1717563730783 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new TimestampedTable({
        name: 'item',
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
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
            isUnique: true,
            comment: '품목명',
          },
          {
            name: 'property',
            type: 'varchar',
            length: '100',
            isNullable: false,
            comment: '품목의 속성 (셀메이트 옵션명)',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('item');
  }
}
