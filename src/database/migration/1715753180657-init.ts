import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseTable } from '../base-table';

export class Init1715753180657 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new BaseTable({
        name: 'product',
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
            length: '50',
            isNullable: false,
            isUnique: true,
          },
        ],
      }),
    );

    // await queryRunner.createTable(
    //   new BaseTable({
    //     name: 'options',
    //     columns: [
    //       {
    //         name: 'id',
    //         type: 'int',
    //         isPrimary: true,
    //         isGenerated: true,
    //         generationStrategy: 'increment',
    //         isNullable: false,
    //       },
    //       {
    //         name: 'product_id',
    //         type: 'int',
    //         isNullable: false,
    //       },
    //       {
    //         name: 'name',
    //         type: 'varchar',
    //         length: '50',
    //         isNullable: false,
    //       },
    //       {
    //         name: 'size',
    //         type: 'varchar',
    //         length: '1000',
    //         isNullable: true,
    //       },
    //       {
    //         name: 'color',
    //         type: 'varchar',
    //         length: '1000',
    //         isNullable: true,
    //       },
    //     ],
    //   }),
    // );

    // await queryRunner.createTable(
    //   new BaseTable({
    //     name: 'warehouse',
    //     columns: [
    //       {
    //         name: 'id',
    //         type: 'int',
    //         isPrimary: true,
    //         isGenerated: true,
    //         generationStrategy: 'increment',
    //         isNullable: false,
    //       },
    //       {
    //         name: 'product_id',
    //         type: 'int',
    //         isNullable: false,
    //       },
    //       {
    //         name: 'name',
    //         type: 'varchar',
    //         length: '50',
    //         isNullable: false,
    //       },
    //     ],
    //   }),
    // );

    // await queryRunner.createForeignKey(
    //   'warehouse',
    //   new TableForeignKey({
    //     name: 'FK_warehouse_product_id', // 외래 키 제약 조건 이름
    //     columnNames: ['product_id'], // 외래 키가 추가될 열
    //     referencedColumnNames: ['id'], // 외래 키가 참조할 열
    //     referencedTableName: 'product', // 외래 키가 참조할 테이블
    //     onDelete: 'CASCADE', // 연결된 행이 삭제될 때의 동작
    //   }),
    // );

    // await queryRunner.createForeignKey(
    //   'options',
    //   new TableForeignKey({
    //     name: 'FK_options_product_id', // 외래 키 제약 조건 이름
    //     columnNames: ['product_id'], // 외래 키가 추가될 열
    //     referencedColumnNames: ['id'], // 외래 키가 참조할 열
    //     referencedTableName: 'product', // 외래 키가 참조할 테이블
    //     onDelete: 'CASCADE', // 연결된 행이 삭제될 때의 동작
    //   }),
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 외래 키 제약 조건 삭제
    // await queryRunner.dropForeignKey('warehouse', 'FK_warehouse_product_id');
    // await queryRunner.dropForeignKey('options', 'FK_options_product_id');

    // 테이블 삭제
    // await queryRunner.dropTable('warehouse');
    // await queryRunner.dropTable('options');
    await queryRunner.dropTable('product');
  }
}
