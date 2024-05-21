import { TimestampColumnHelper } from 'src/common/helpers/timestamp-columns.helper';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateWorkLog1716256304265 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'work_log',
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
            name: 'work_code',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'result',
            type: 'enum',
            enum: ['success', 'fail'],
            isNullable: true,
          },
          {
            name: 'form_data',
            type: 'text',
            isNullable: true,
          },
          ...TimestampColumnHelper.createTimestampColumns(),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('work_log');
  }
}
