import { Category } from 'src/modules/tenant/enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableOperationType1718752642562
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
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

    // TODO: 기본 데이터 값의 국제화
    // TODO: 마이그레이션 과정이 아닌 별도 기능으로 분리 구현
    await queryRunner.query(`
			INSERT INTO
				operation_type (category, name, is_default, reserved)
			VALUES
				('incoming', '생산입고', 0, 1),
				('incoming', '구매입고', 1, 1),
				('incoming', '검사후 입고', 0, 1),
				('incoming', '재조조정 입고', 0, 1),

				('outgoing', '판매출고', 1, 1),
				('outgoing', '생산출고', 0, 1),
				('outgoing', '검사후 출고', 0, 1),
				('outgoing', '재조조정 출고', 0, 1),

				('movement', '창고 간 이동', 0, 1),
				('movement', '창고 내 이동', 1, 1),
				('movement', '불량으로 인한 이동', 0, 1);
		`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('operation_type');
  }
}
