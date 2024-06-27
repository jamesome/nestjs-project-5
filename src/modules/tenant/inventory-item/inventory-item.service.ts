import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
// import { FindInventoryItemDto } from './dto/find-item-location.dto';
import { UpdateInventoryItemDto } from './dto/update-inventory-item.dto';
import { InventoryItem } from './entities/inventory-item.entity';

@Injectable()
export class InventoryItemService {
  private inventoryItemRepository: Repository<InventoryItem>;

  constructor(@Inject('CONNECTION') private readonly dataSource: DataSource) {
    this.inventoryItemRepository = this.dataSource.getRepository(InventoryItem);
  }

  async create(createInventoryItemDto: CreateInventoryItemDto) {
    console.log(createInventoryItemDto);
  }

  // 로케이션 별 inventory-item(with. item, lot)
  async findAll(warehouseId: number, locationId: number) {
    const inventoryItems = await this.inventoryItemRepository.find({
      relations: { item: true, lot: true },
      where: {
        location: {
          id: locationId,
          zone: {
            warehouse: {
              id: warehouseId,
            },
          },
        },
      },
    });

    return inventoryItems.map((inventoryItem) => ({
      quantity: inventoryItem.quantity,
      status: inventoryItem.status,
      item: {
        id: inventoryItem.item.id,
        name: inventoryItem.item.name,
        property: inventoryItem.item.property,
        item_codes: inventoryItem.item.itemCodes.map((itemCode) => ({
          id: itemCode.id,
          code: itemCode.code,
        })),
      },
      lot: {
        number: inventoryItem?.lot?.number,
        expiration_date: inventoryItem?.lot?.expirationDate,
      },
    }));
  }

  async update(id: number, updateInventoryItemDto: UpdateInventoryItemDto) {
    return await this.inventoryItemRepository.update(
      id,
      updateInventoryItemDto,
    );
  }

  async remove(id: number) {
    return await this.inventoryItemRepository.delete(id);
  }
}
