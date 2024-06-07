import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterAddColumn1717722674128 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'warehouse',
      new TableColumn({
        name: 'is_default',
        type: 'tinyInt',
        isNullable: false,
        comment: '기본 창고 여부',
        default: false,
      }),
    );

    await queryRunner.addColumn(
      'zone',
      new TableColumn({
        name: 'is_default',
        type: 'tinyInt',
        isNullable: false,
        comment: '기본 분류 여부',
        default: false,
      }),
    );

    await queryRunner.addColumn(
      'location',
      new TableColumn({
        name: 'is_default',
        type: 'tinyInt',
        isNullable: false,
        comment: '기본 로케이션 여부',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumn('location', 'is_default');
    queryRunner.dropColumn('zone', 'is_default');
    queryRunner.dropColumn('warehouse', 'is_default');
  }
}
