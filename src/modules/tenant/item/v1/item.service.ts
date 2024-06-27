import { Inject, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { DataSource, Like, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { FindItemDto } from './dto/find-item.dto';
import { InventoryItem } from '../../inventory-item/entities/inventory-item.entity';

@Injectable()
export class ItemService {
  private itemRepository: Repository<Item>;

  constructor(@Inject('CONNECTION') private readonly dataSource: DataSource) {
    this.itemRepository = this.dataSource.getRepository(Item);
  }

  async create(createItemDto: CreateItemDto) {
    const warehouse = this.itemRepository.create(createItemDto);

    return await this.itemRepository.save(warehouse);
  }

  async find(findItemDto: FindItemDto) {
    const { includeInventory } = findItemDto;

    if (includeInventory) {
      return await this.getManyItemsWithInventoryList(findItemDto);
    }

    return await this.getManyItemsWithOutInventoryList(findItemDto);
  }

  async getManyItemsWithInventoryList(findItemDto: FindItemDto) {
    const { name, property, itemCode } = findItemDto;
    const queryBuilder = this.itemRepository.createQueryBuilder('item');

    // FIXME: DBMS내의 view 정의를 통해 간결하게 정리하거나, Repository 커스텀 방법을 찾아서 구현 이전방법 모색
    queryBuilder
      .select([
        'item.id',
        'item.name',
        'item.property',
        'item.createdAt',
        'item_code.id',
        'item_code.code',
        'supplier.id',
        'supplier.name',
        'item_serial.id',
        'item_serial.serialNo',
        'lot.id',
        // 'lot.num',
      ])
      .addSelect((subQuery) => {
        return subQuery
          .select('SUM(inventory_item.quantity)', 'quantityTotal')
          .from(InventoryItem, 'inventory_item')
          .where('inventory_item.item_id = item.id')
          .andWhere('inventory_item.status <> "disposed"');
      }, 'quantityTotal')
      .addSelect((subQuery) => {
        return subQuery
          .select('SUM(inventory_item.quantity)', 'quantityAvailable')
          .from(InventoryItem, 'inventory_item')
          .where('inventory_item.item_id = item.id')
          .andWhere('inventory_item.status = "normal"');
      }, 'quantityAvailable')
      .addSelect((subQuery) => {
        return subQuery
          .select('SUM(inventory_item.quantity)', 'quantityNonAvailable')
          .from(InventoryItem, 'inventory_item')
          .where('inventory_item.item_id = item.id')
          .andWhere('inventory_item.status = "abnormal"');
      }, 'quantityNonAvailable')
      .addSelect((subQuery) => {
        return subQuery
          .select(
            "JSON_ARRAYAGG(JSON_OBJECT('zone_id', t.zone_id, 'zone_name', t.zone_name, 'quantity', t.quantity))",
            'quantity_by_zone',
          )
          .from((qb) => {
            return qb
              .select('location.zone_id', 'zone_id')
              .addSelect('zone.name', 'zone_name')
              .addSelect('SUM(inventory_item.quantity)', 'quantity')
              .from(InventoryItem, 'inventory_item')
              .leftJoin('inventory_item.location', 'location')
              .leftJoin('location.zone', 'zone')
              .where('inventory_item.item_id = item.id')
              .andWhere('inventory_item.status <> "disposed"')
              .groupBy('location.zone_id')
              .orderBy({ 'location.zone_id': 'ASC' });
          }, 't');
      }, 'quantityByZone')
      .addSelect((subQuery) => {
        return subQuery
          .select(
            "JSON_ARRAYAGG(JSON_OBJECT('zone_id', t.zone_id, 'zone_name', t.zone_name, 'status', t.status, 'quantity', t.quantity))",
            'quantity_by_status_in_zone',
          )
          .from((qb) => {
            return qb
              .select('location.zone_id', 'zone_id')
              .addSelect('zone.name', 'zone_name')
              .addSelect('SUM(inventory_item.quantity)', 'quantity')
              .addSelect('inventory_item.status', 'status')
              .from(InventoryItem, 'inventory_item')
              .leftJoin('inventory_item.location', 'location')
              .leftJoin('location.zone', 'zone')
              .where('inventory_item.item_id = item.id')
              .andWhere('location.deletedAt IS NULL')
              .groupBy('location.zone_id, inventory_item.status')
              .orderBy({ 'location.zone_id': 'ASC' });
          }, 't');
      }, 'quantityByStatusInZone');

    queryBuilder
      .leftJoin('item.itemCodes', 'item_code')
      .leftJoin('item.itemSerials', 'item_serial')
      .leftJoin('item.lots', 'lot')
      .leftJoin('lot.supplier', 'supplier')
      .leftJoin('item.inventoryItems', 'inventory_item')
      .leftJoin('inventory_item.location', 'location');

    name &&
      queryBuilder.andWhere('item.name like :name', { name: `%${name}%` });
    property &&
      queryBuilder.andWhere('item.property like :property', {
        property: `%${property}%`,
      });
    itemCode &&
      queryBuilder.andWhere('item_code.code like :code', {
        code: `%${itemCode}%`,
      });

    queryBuilder
      .groupBy('item.id, item_code.id, lot.id, supplier.id, item_serial.id')
      .orderBy({ 'item.createdAt': 'DESC', 'item.id': 'DESC' });

    const items = await queryBuilder.getManyItem();

    // FIXME: DTO 활용하는 방향으로 개선.
    return items?.map((item) => ({
      id: item.id,
      name: item.name,
      property: item.property,
      created_at: item.createdAt,
      item_codes: item.itemCodes.map((itemCode) => ({
        id: itemCode.id,
        code: itemCode.code,
      })),
      item_serials: item.itemSerials.map((itemSerial) => ({
        id: itemSerial.id,
        serial_no: itemSerial.serialNo,
      })),
      lots: item.lots.map((lot) => ({
        id: lot.id,
        number: lot.number,
        expiration_date: lot.expirationDate,
        supplier: lot.supplier,
      })),
      quantity_total: item.quantityTotal,
      quantity_available: item.quantityAvailable,
      quantity_non_available: item.quantityNonAvailable,
      quantity_by_zone: item.quantityByZone,
      quantity_by_status_in_zone: item.quantityByStatusInZone,
    }));
  }

  async getManyItemsWithOutInventoryList(findItemDto: FindItemDto) {
    const { name, property, itemCode, locationId } = findItemDto;
    const filters: any = {
      where: {
        ...(name && { name: Like(`%${name}%`) }),
        ...(property && { property: Like(`%${property}%`) }),
        ...(itemCode && { itemCodes: { code: Like(`%${itemCode}%`) } }),
        ...(locationId && { inventoryItems: { locationId } }),
      },
      order: {
        createdAt: 'DESC',
        id: 'DESC',
      },
    };

    const items = await this.itemRepository.find(filters);

    return items.map((item) => ({
      id: item.id,
      name: item.name,
      property: item.property,
      created_at: item.createdAt,
      item_codes: item.itemCodes.map((itemCode) => ({
        id: itemCode.id,
        code: itemCode.code,
      })),
      item_serials: item.itemSerials.map((itemSerial) => ({
        id: itemSerial.id,
        serial_no: itemSerial.serialNo,
      })),
      inventory_items: item.inventoryItems.map((inventoryItem) => ({
        quantity: inventoryItem.quantity,
        status: inventoryItem.status,
        lot: {
          number: inventoryItem?.lot?.number ?? null,
        },
      })),
    }));
  }

  async findOne(id: number) {
    const item = this.itemRepository.findOne({
      where: { id },
    });

    // TODO: 추후 응답포맷 확정될 때 같이 수정
    // if (!item) {
    //   return null;
    // }

    return await item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    return await this.itemRepository.update(id, updateItemDto);
  }

  async remove(id: number) {
    return await this.itemRepository.softDelete(id);
  }
}
