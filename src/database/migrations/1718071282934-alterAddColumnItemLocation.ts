import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterAddColumnItemLocation1718071282934
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'item_location',
      new TableColumn({
        name: 'lot_no',
        type: 'varchar(50)',
        isNullable: true,
        comment: 'Lot Number',
      }),
    );

    await queryRunner.addColumn(
      'item_location',
      new TableColumn({
        name: 'expiration_date',
        type: 'timestamp',
        isNullable: true,
        comment: '유통기한',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumn('item_location', 'lot_no');
    queryRunner.dropColumn('item_location', 'expiration_date');
  }
}
