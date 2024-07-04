import { Category, InputType, StockStatus } from 'src/modules/tenant/enum';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class Init1719579847103 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
            name: 'is_default',
            type: 'tinyInt',
            isNullable: false,
            default: false,
            comment: '기본 창고 여부',
          },
          {
            name: 'create_worker',
            type: 'varchar',
            length: '50',
            isNullable: false,
            comment: '창고 등록 작업자',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'zone',
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
            name: 'warehouse_id',
            type: 'int',
            isNullable: false,
            comment: '(FK) warehouse 외래키',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
            isUnique: true,
            comment: '분류(zone)명',
          },
          {
            name: 'code',
            type: 'varchar',
            length: '100',
            isNullable: true,
            isUnique: true,
            comment: '분류(zone)코드',
          },
          {
            name: 'is_default',
            type: 'tinyInt',
            isNullable: false,
            default: false,
            comment: '기본 분류 여부',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'zone',
      new TableForeignKey({
        name: 'FK_zone_warehouse_id', // 외래 키 제약 조건 이름
        columnNames: ['warehouse_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'warehouse', // 외래 키가 참조할 테이블
        // onDelete: 'CASCADE', // 연결된 행이 삭제될 때의 동작
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'location',
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
            name: 'zone_id',
            type: 'int',
            isNullable: false,
            comment: '(FK) zone 외래키',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
            isUnique: true,
            comment: '로케이션명',
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
            comment: '로케이션 등록 작업자',
          },
          {
            name: 'is_default',
            type: 'tinyInt',
            isNullable: false,
            default: false,
            comment: '기본 로케이션 여부',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'location',
      new TableForeignKey({
        name: 'FK_location_zone_id', // 외래 키 제약 조건 이름
        columnNames: ['zone_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'zone', // 외래 키가 참조할 테이블
        // onDelete: 'CASCADE', // 연결된 행이 삭제될 때의 동작
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'item',
        columns: [
          {
            name: 'id',
            type: 'bigint',
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

    await queryRunner.createTable(
      new Table({
        name: 'item_code',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
          },
          {
            name: 'item_id',
            type: 'bigint',
            isNullable: false,
            comment: '(FK) item 외래키',
          },
          {
            name: 'code',
            type: 'varchar',
            length: '100',
            isNullable: false,
            isUnique: true,
            comment: 'item의 코드(바코드, QR코드, RFID 등)',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'item_code',
      new TableForeignKey({
        name: 'FK_item_code_item_id', // 외래 키 제약 조건 이름
        columnNames: ['item_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'item', // 외래 키가 참조할 테이블
        // onDelete: 'CASCADE', // 연결된 행이 삭제될 때의 동작
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'inventory_item',
        columns: [
          {
            name: 'item_id',
            type: 'bigint',
            isNullable: false,
            comment: '(FK) item 외래키',
          },
          {
            name: 'location_id',
            type: 'int',
            isNullable: false,
            comment: '(FK) location 외래키',
          },
          {
            name: 'lot_id',
            type: 'bigint',
            isNullable: true,
            comment: '(FK) lot 외래키',
          },
          {
            name: 'status',
            type: 'enum',
            isNullable: false,
            enum: Object.values(StockStatus),
            comment:
              '품목의 재고 상태. normal(정상), abnormal(비정상), disposed(폐기)',
          },
          {
            name: 'quantity',
            type: 'int',
            length: '100',
            isNullable: false,
            comment: '품목의 재고 수량',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'inventory_item',
      new TableForeignKey({
        name: 'FK_inventory_item_item_id', // 외래 키 제약 조건 이름
        columnNames: ['item_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'item', // 외래 키가 참조할 테이블
        // onDelete: 'CASCADE', // 연결된 행이 삭제될 때의 동작
      }),
    );

    await queryRunner.createForeignKey(
      'inventory_item',
      new TableForeignKey({
        name: 'FK_inventory_item_location_id', // 외래 키 제약 조건 이름
        columnNames: ['location_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'location', // 외래 키가 참조할 테이블
        // onDelete: 'CASCADE', // 연결된 행이 삭제될 때의 동작
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'item_serial',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
          },
          {
            name: 'item_id',
            type: 'bigint',
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
        // onDelete: 'CASCADE', // 연결된 행이 삭제될 때의 동작
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'operation_type',
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
            name: 'category',
            type: 'enum',
            isNullable: false,
            enum: Object.values(Category),
            comment: '구분. incoming(입고), outgoing(출고), movement(이동)',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
            isNullable: false,
            comment: '재고작업구분명',
          },
          {
            name: 'is_default',
            type: 'tinyInt',
            isNullable: false,
            comment: '기본 재고작업구분(구분별)',
            default: false,
          },
          {
            name: 'reserved',
            type: 'tinyInt',
            isNullable: false,
            comment: '미리 정의 된 예약값',
            default: false,
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      'operation_type',
      new TableIndex({
        name: 'UQ_operation_type_category_name',
        columnNames: ['category', 'name'],
        isUnique: true,
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'supplier',
        columns: [
          {
            name: 'id',
            type: 'bigint',
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
            comment: '공급처명',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'lot',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
          },
          {
            name: 'item_id',
            type: 'bigint',
            isNullable: false,
            comment: '(FK) item 외래키',
          },
          {
            name: 'supplier_id',
            type: 'bigint',
            isNullable: false,
            comment: '(FK) supplier 외래키',
          },
          {
            name: 'number',
            type: 'varchar',
            length: '50',
            isUnique: true,
            isNullable: false,
            comment: '로트 넘버',
          },
          {
            name: 'expiration_date',
            type: 'date',
            isNullable: true,
            comment: '유통기한',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'lot',
      new TableForeignKey({
        name: 'FK_lot_item_id', // 외래 키 제약 조건 이름
        columnNames: ['item_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'item', // 외래 키가 참조할 테이블
        // onDelete: 'CASCADE', // 연결된 행이 삭제될 때의 동작
      }),
    );

    await queryRunner.createForeignKey(
      'lot',
      new TableForeignKey({
        name: 'FK_lot_supplier_id', // 외래 키 제약 조건 이름
        columnNames: ['supplier_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'supplier', // 외래 키가 참조할 테이블
        // onDelete: 'CASCADE', // 연결된 행이 삭제될 때의 동작
      }),
    );

    await queryRunner.createForeignKey(
      'supplier',
      new TableForeignKey({
        name: 'FK_supplier_item_id', // 외래 키 제약 조건 이름
        columnNames: ['item_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'item', // 외래 키가 참조할 테이블
        // onDelete: 'CASCADE', // 연결된 행이 삭제될 때의 동작
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'transaction',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
          },
          {
            name: 'item_id',
            type: 'bigint',
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
            type: 'bigint',
            isNullable: true,
            comment: '(FK) lot 외래키',
          },
          {
            name: 'supplier_id',
            type: 'bigint',
            isNullable: false,
            comment: '(FK) supplier 외래키',
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
            enum: Object.values(InputType),
            isNullable: false,
            comment: '작업 유형',
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
      'transaction',
      new TableForeignKey({
        name: 'FK_transaction_item_id', // 외래 키 제약 조건 이름
        columnNames: ['item_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'item', // 외래 키가 참조할 테이블
        // onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'transaction',
      new TableForeignKey({
        name: 'FK_transaction_location_departure_id', // 외래 키 제약 조건 이름
        columnNames: ['location_departure_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'location', // 외래 키가 참조할 테이블
        // onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'transaction',
      new TableForeignKey({
        name: 'FK_transaction_location_arrival_id', // 외래 키 제약 조건 이름
        columnNames: ['location_arrival_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'location', // 외래 키가 참조할 테이블
        // onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'transaction',
      new TableForeignKey({
        name: 'FK_transaction_lot_id', // 외래 키 제약 조건 이름
        columnNames: ['lot_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'lot', // 외래 키가 참조할 테이블
        // onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'transaction',
      new TableForeignKey({
        name: 'FK_transaction_supplier_id', // 외래 키 제약 조건 이름
        columnNames: ['supplier_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'supplier', // 외래 키가 참조할 테이블
        // onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'transaction',
      new TableForeignKey({
        name: 'FK_transaction_operation_type_id', // 외래 키 제약 조건 이름
        columnNames: ['operation_type_id'], // 외래 키가 추가될 열
        referencedColumnNames: ['id'], // 외래 키가 참조할 열
        referencedTableName: 'operation_type', // 외래 키가 참조할 테이블
        // onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'transaction',
      'FK_transaction_operation_type_id',
    );
    await queryRunner.dropForeignKey(
      'transaction',
      'FK_transaction_supplier_id',
    );
    await queryRunner.dropForeignKey('transaction', 'FK_transaction_lot_id');
    await queryRunner.dropForeignKey(
      'transaction',
      'FK_transaction_location_departure_id',
    );
    await queryRunner.dropForeignKey(
      'transaction',
      'FK_transaction_location_arrival_id',
    );
    await queryRunner.dropForeignKey('transaction', 'FK_transaction_item_id');
    await queryRunner.dropTable('transaction');

    await queryRunner.dropForeignKey('supplier', 'FK_supplier_item_id');
    await queryRunner.dropTable('supplier');

    await queryRunner.dropForeignKey('lot', 'FK_lot_item_id');
    await queryRunner.dropTable('lot');

    await queryRunner.dropIndex(
      'operation_type',
      'UQ_operation_type_category_name',
    );

    await queryRunner.dropTable('operation_type');

    await queryRunner.dropForeignKey('item_serial', 'FK_item_serial_item_id');
    await queryRunner.dropTable('item_serial');

    await queryRunner.dropForeignKey(
      'inventory_item',
      'FK_inventory_item_location_id',
    );
    await queryRunner.dropForeignKey(
      'inventory_item',
      'FK_inventory_item_item_id',
    );
    await queryRunner.dropTable('inventory_item');

    await queryRunner.dropForeignKey('item_code', 'FK_item_code_item_id');
    await queryRunner.dropTable('item_code');

    await queryRunner.dropTable('item');

    await queryRunner.dropForeignKey('location', 'FK_location_zone_id');
    await queryRunner.dropTable('location');

    await queryRunner.dropForeignKey('zone', 'FK_zone_warehouse_id');
    await queryRunner.dropTable('zone');

    await queryRunner.dropTable('warehouse');
  }
}
