import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameItemLocation1719445036522 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('item_location', 'inventory_item');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('inventory_item', 'item_location');
  }
}
