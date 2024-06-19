import { Inject, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { DataSource, Like, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { FindItemDto } from './dto/find-item.dto';
import { ItemLocation } from '../../item-location/entities/item-location.entity';
import { ItemSerial } from '../../item-serial/entities/item-serial.entity';
import { CreateItemLocationDto } from '../../item-location/dto/create-item-location.dto';

@Injectable()
export class ItemService {
  private itemRepository: Repository<Item>;
  private itemLocationRepository: Repository<ItemLocation>;
  private itemSerialRepository: Repository<ItemSerial>;

  constructor(@Inject('CONNECTION') private readonly dataSource: DataSource) {
    this.itemRepository = this.dataSource.getRepository(Item);
    this.itemLocationRepository = this.dataSource.getRepository(ItemLocation);
    this.itemSerialRepository = this.dataSource.getRepository(ItemSerial);
  }

  async create(createItemDto: CreateItemDto) {
    const warehouse = this.itemRepository.create(createItemDto);

    return await this.itemRepository.save(warehouse);
  }

  async inbound(createItemLocationDto: CreateItemLocationDto[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    for (const dto of createItemLocationDto) {
      const itemLocationRecord = await this.itemLocationRepository.findOne({
        where: {
          itemId: dto.itemId,
          locationId: dto.locationId,
          status: dto.status,
          lotNo: dto.lotNo,
        },
      });

      await queryRunner.startTransaction();

      try {
        if (itemLocationRecord) {
          await queryRunner.manager.update(ItemLocation, itemLocationRecord, {
            quantity: itemLocationRecord.quantity + dto.quantity,
          });
        } else {
          const newItemLocation = this.itemLocationRepository.create({
            itemId: dto.itemId,
            locationId: dto.locationId,
            quantity: dto.quantity,
            status: dto.status,
            lotNo: dto.lotNo,
            expirationDate: dto.expirationDate,
          });

          await queryRunner.manager.insert(ItemLocation, newItemLocation);
        }

        if (dto.itemSerial.serialNo) {
          const newItemLocation = this.itemSerialRepository.create({
            itemId: dto.itemId,
            serialNo: dto.itemSerial.serialNo,
          });

          await queryRunner.manager.insert(ItemSerial, newItemLocation);
        }

        await queryRunner.commitTransaction();
      } catch (error) {
        await queryRunner.rollbackTransaction();
      } finally {
        // await queryRunner.release();
      }
    }

    await queryRunner.release();
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

    // FIXME: QUERY 정리 필요.
    queryBuilder
      .select([
        'item.id',
        'item.name',
        'item.property',
        'item_code.id',
        'item_code.code',
        'supplier.id',
        'supplier.name',
      ])
      .addSelect((subQuery) => {
        return subQuery
          .select('SUM(item_location.quantity)', 'quantity_total')
          .from(ItemLocation, 'item_location')
          .where('item_location.item_id = item.id');
      }, 'quantity_total')
      .addSelect((subQuery) => {
        return subQuery
          .select('SUM(item_location.quantity)', 'quantity_available')
          .from(ItemLocation, 'item_location')
          .where('item_location.item_id = item.id')
          .andWhere('item_location.status = "normal"');
      }, 'quantity_available')
      .addSelect((subQuery) => {
        return subQuery
          .select('SUM(item_location.quantity)', 'quantity_non_available')
          .from(ItemLocation, 'item_location')
          .where('item_location.item_id = item.id')
          .andWhere('item_location.status <> "normal"');
      }, 'quantity_non_available')
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
              .addSelect('SUM(item_location.quantity)', 'quantity')
              .from(ItemLocation, 'item_location')
              .leftJoin('item_location.location', 'location')
              .leftJoin('location.zone', 'zone')
              .where('item_location.item_id = item.id')
              .andWhere('location.deletedAt IS NULL')
              .groupBy('location.zone_id')
              .orderBy({ 'location.zone_id': 'ASC' });
          }, 't');
      }, 'quantity_by_zone');

    queryBuilder
      .leftJoin('item.itemCodes', 'item_code')
      .leftJoin('item.suppliers', 'supplier')
      .leftJoin('item.itemLocations', 'item_location')
      .leftJoin('item_location.location', 'location');

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
      .groupBy('item.id, item_code.id, supplier.id')
      .orderBy({ 'item.createdAt': 'DESC', 'item.id': 'DESC' });

    const items = await queryBuilder.getManyItem();

    return items?.map((item) => ({
      id: item.id,
      name: item.name,
      property: item.property,
      created_at: item.createdAt,
      item_codes: item.itemCodes.map((itemCode) => ({
        id: itemCode.id,
        code: itemCode.code,
      })),
      suppliers: item.suppliers.map((supplier) => ({
        id: supplier.id,
        name: supplier.name,
      })),
      quantity_total: item.quantityTotal,
      quantity_available: item.quantityAvailable,
      quantity_non_available: item.quantityNonAvailable,
      quantity_by_zone: item.quantityByZone,
    }));
  }

  async getManyItemsWithOutInventoryList(findItemDto: FindItemDto) {
    const { name, property, itemCode } = findItemDto;
    const findOptions: any = {
      where: {
        ...(name && { name: Like(`%${name}%`) }),
        ...(property && { property: Like(`%${property}%`) }),
        ...(itemCode && { itemCodes: { code: Like(`%${itemCode}%`) } }),
      },
      order: {
        createdAt: 'DESC',
        id: 'DESC',
      },
    };

    const items = await this.itemRepository.find(findOptions);

    return items.map((item) => ({
      id: item.id,
      name: item.name,
      property: item.property,
      created_at: item.createdAt,
      item_codes: item.itemCodes.map((itemCode) => ({
        id: itemCode.id,
        code: itemCode.code,
      })),
      suppliers: item.suppliers.map((supplier) => ({
        id: supplier.id,
        name: supplier.name,
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
