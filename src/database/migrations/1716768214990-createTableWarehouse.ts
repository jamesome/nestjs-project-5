import { MigrationInterface, QueryRunner } from 'typeorm';
import { TimestampedTable } from '../timestamped-table';

export class CreateTableWarehouse1716768214990 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new TimestampedTable({
        name: 'warehouse',
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
            comment: '창고명',
          },
          {
            name: 'code',
            type: 'varchar',
            length: '100',
            isNullable: true,
            isUnique: true,
            comment: '창고코드',
          },
          {
            name: 'post_code',
            type: 'varchar',
            length: '10',
            isNullable: true,
            comment: '우편번호',
          },
          {
            name: 'address',
            type: 'varchar',
            length: '500',
            isNullable: true,
            comment: '기본주소',
          },
          {
            name: 'detail_address',
            type: 'varchar',
            length: '500',
            isNullable: true,
            comment: '상세주소',
          },
          {
            name: 'manager',
            type: 'varchar',
            length: '50',
            isNullable: true,
            comment: '창고 담당자',
          },
          {
            name: 'contact',
            type: 'varchar',
            length: '20',
            isNullable: true,
            comment: '연락처',
          },
          {
            name: 'create_worker',
            type: 'varchar',
            length: '50',
            isNullable: false,
            comment: '창고 등록 작업자',
          },
          {
            name: 'default',
            type: 'tinyInt',
            isNullable: false,
            comment: '기본 창고 여부',
            default: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('warehouse');
  }
}
