import { InputType } from 'src/modules/enum';
import { TableColumn } from 'typeorm';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableInventoryTransaction1719307883620
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE inventory_transaction`);

    await queryRunner.changeColumn(
      'inventory_transaction',
      'input_type',
      new TableColumn({
        name: 'input_type',
        type: 'enum',
        enum: Object.values(InputType),
        isNullable: false,
        comment: '작업 유형',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'inventory_transaction',
      'input_type',
      new TableColumn({
        name: 'input_type',
        type: 'enum',
        enum: ['Web > 입고', 'Web > 로케이션 이동'],
        isNullable: false,
        comment: '작업 유형',
      }),
    );
  }
}
