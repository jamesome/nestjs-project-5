import { Inject, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { DataSource, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { FindItemDto } from './dto/find-item.dto';

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

  async findAll(findItemDto: FindItemDto) {
    const { name, property, itemCode } = findItemDto;
    const queryBuilder = this.itemRepository.createQueryBuilder('item');

    queryBuilder.leftJoinAndSelect('item.itemCodes', 'item_code');
    queryBuilder.leftJoinAndSelect('item.suppliers', 'supplier');
    queryBuilder.leftJoin('item.itemLocations', 'itemLocations');

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
      .addSelect('SUM(itemLocations.quantity)', 'totalQuantity');

    queryBuilder.orderBy({ 'item.createdAt': 'DESC', 'item.id': 'DESC' });

    const items = await queryBuilder.getMany();

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
      total_quantity: 123,
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
