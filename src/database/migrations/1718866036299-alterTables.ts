import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class AlterTables1718866036299 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'item_location',
      new TableColumn({
        name: 'lot_id',
        type: 'int',
        isNullable: true,
        comment: '(FK) lot 외래키',
      }),
    );

    await queryRunner.dropColumns('item_location', [
      'lot_no',
      'expiration_date',
    ]);

    await queryRunner.dropForeignKey('supplier', 'FK_supplier_item_id');
    await queryRunner.dropColumn('supplier', 'item_id');

    await queryRunner.createTable(
      new Table({
        name: 'lot',
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
            name: 'supplier_id',
            type: 'int',
            isNullable: false,
            comment: '(FK) supplier 외래키',
          },
          {
            name: 'number',
            type: 'varchar',
            length: '50',
            isNullable: false,
            comment: '로트 넘버',
          },
          {
            name: 'expiration_date',
            type: 'timestamp',
            isNullable: true,
            comment: '유통기한',
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      'lot',
      new TableIndex({
        name: 'UQ_lot_supplier_id_number',
        columnNames: ['supplier_id', 'number'],
        isUnique: true,
      }),
    );

    await queryRunner.createForeignKey(
      'lot',
      new TableForeignKey({
        name: 'FK_lot_item_id', // 외래 키 제약 조건 이름
        columnNames: ['item_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'item', // 외래 키가 참조할 테이블
        onDelete: 'CASCADE', // 연결된 행이 삭제될 때의 동작
      }),
    );

    await queryRunner.createForeignKey(
      'lot',
      new TableForeignKey({
        name: 'FK_lot_supplier_id', // 외래 키 제약 조건 이름
        columnNames: ['supplier_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'supplier', // 외래 키가 참조할 테이블
        onDelete: 'CASCADE', // 연결된 행이 삭제될 때의 동작
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('lot', 'FK_lot_supplier_id');
    await queryRunner.dropForeignKey('lot', 'FK_lot_item_id');
    await queryRunner.dropIndex('lot', 'UQ_lot_supplier_id_number');

    await queryRunner.dropTable('lot');

    await queryRunner.query(`TRUNCATE TABLE supplier`);

    await queryRunner.addColumn(
      'supplier',
      new TableColumn({
        name: 'item_id',
        type: 'int',
        isNullable: false,
        comment: '(FK) item 외래키',
      }),
    );

    await queryRunner.createForeignKey(
      'supplier',
      new TableForeignKey({
        name: 'FK_supplier_item_id', // 외래 키 제약 조건 이름
        columnNames: ['item_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'item', // 외래 키가 참조할 테이블
        onDelete: 'CASCADE', // 연결된 행이 삭제될 때의 동작
      }),
    );

    await queryRunner.addColumns('item_location', [
      new TableColumn({
        name: 'lot_no',
        type: 'varchar(50)',
        isNullable: true,
        comment: 'Lot Number',
      }),
      new TableColumn({
        name: 'expiration_date',
        type: 'timestamp',
        isNullable: true,
        comment: '유통기한',
      }),
    ]);

    queryRunner.dropColumn('item_location', 'lot_id');
  }
}
