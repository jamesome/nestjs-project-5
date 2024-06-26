import { Category, InputType } from 'src/modules/enum';
import { Table, TableForeignKey } from 'typeorm';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableInventoryTransction1719215813258
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'inventory_transaction',
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
            name: 'location_departure_id',
            type: 'int',
            isNullable: true,
            comment: '(FK) location 외래키',
          },
          {
            name: 'location_arrival_id',
            type: 'int',
            isNullable: true,
            comment: '(FK) location 외래키',
          },
          {
            name: 'lot_id',
            type: 'int',
            isNullable: true,
            comment: '(FK) lot 외래키',
          },
          {
            name: 'operation_type_id',
            type: 'int',
            isNullable: false,
            comment: '(FK) operation_type 외래키',
          },
          {
            name: 'category',
            type: 'enum',
            isNullable: false,
            enum: Object.values(Category),
            comment: '구분. 입고 | 출고 | 이동',
          },
          {
            name: 'input_type',
            type: 'enum',
            isNullable: false,
            enum: Object.values(InputType),
            comment: '입고 유형. incoming(개별입고)...',
          },
          {
            name: 'quantity',
            type: 'int',
            isNullable: false,
            comment: '수량',
          },
          {
            name: 'remark',
            type: 'text',
            isNullable: true,
            comment: '비고',
          },
          {
            name: 'create_worker',
            type: 'varchar',
            length: '50',
            isNullable: false,
            comment: '작업자',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'inventory_transaction',
      new TableForeignKey({
        name: 'FK_inventory_transaction_item_id', // 외래 키 제약 조건 이름
        columnNames: ['item_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'item', // 외래 키가 참조할 테이블
        // onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'inventory_transaction',
      new TableForeignKey({
        name: 'FK_inventory_transaction_location_departure_id', // 외래 키 제약 조건 이름
        columnNames: ['location_departure_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'location', // 외래 키가 참조할 테이블
        // onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'inventory_transaction',
      new TableForeignKey({
        name: 'FK_inventory_transaction_location_arrival_id', // 외래 키 제약 조건 이름
        columnNames: ['location_arrival_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'location', // 외래 키가 참조할 테이블
        // onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'inventory_transaction',
      new TableForeignKey({
        name: 'FK_inventory_transaction_lot_id', // 외래 키 제약 조건 이름
        columnNames: ['lot_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'lot', // 외래 키가 참조할 테이블
        // onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'inventory_transaction',
      new TableForeignKey({
        name: 'FK_inventory_transaction_operation_type_id', // 외래 키 제약 조건 이름
        columnNames: ['operation_type_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'operation_type', // 외래 키가 참조할 테이블
        // onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'inventory_transaction',
      'FK_inventory_transaction_operation_type_id',
    );
    await queryRunner.dropForeignKey(
      'inventory_transaction',
      'FK_inventory_transaction_lot_id',
    );
    await queryRunner.dropForeignKey(
      'inventory_transaction',
      'FK_inventory_transaction_location_departure_id',
    );
    await queryRunner.dropForeignKey(
      'inventory_transaction',
      'FK_inventory_transaction_location_arrival_id',
    );
    await queryRunner.dropForeignKey(
      'inventory_transaction',
      'FK_inventory_transaction_item_id',
    );
    await queryRunner.dropTable('inventory_transaction');
  }
}
