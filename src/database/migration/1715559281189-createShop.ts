import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateShop1715559281189 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'shop',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
          },
          {
            name: 'warehouse_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'now()',
            isNullable: true,
          },
          {
            name: 'deleted_at',
            type: 'datetime',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'shop',
      new TableForeignKey({
        columnNames: ['warehouse_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'warehouse', // 외래 키가 참조할 테이블
        onDelete: 'CASCADE', // 연결된 행이 삭제될 때의 동작
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('shop');
  }
}
