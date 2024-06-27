import { Inject, Injectable } from '@nestjs/common';
import { CreateInventoryTransactionDto } from './dto/create-inventory-transaction.dto';
import { UpdateInventoryTransactionDto } from './dto/update-inventory-transaction.dto';
import { FindInventoryTransactionDto } from './dto/find-inventory-transaction.dto';
import { Between, DataSource, Like, Repository } from 'typeorm';
import { InventoryTransaction } from './entities/inventory-transaction.entity';

@Injectable()
export class InventoryTransactionService {
  private inventoryTransactionRepository: Repository<InventoryTransaction>;

  constructor(@Inject('CONNECTION') private readonly dataSource: DataSource) {
    this.inventoryTransactionRepository =
      this.dataSource.getRepository(InventoryTransaction);
  }

  async create(createInventoryTransactionDto: CreateInventoryTransactionDto) {
    const inventoryTransaction = this.inventoryTransactionRepository.create(
      createInventoryTransactionDto,
    );

    return await this.inventoryTransactionRepository.save(inventoryTransaction);
  }

  async findAll(findInventoryTransactionDto: FindInventoryTransactionDto) {
    const { startDate, endDate, operationTypeCategory, itemName } =
      findInventoryTransactionDto;
    const filters: any = {
      relations: {
        lot: true,
        // operationType: true,
        locationDeparture: true,
        locationArrival: true,
      },
      where: {
        ...(startDate &&
          endDate && {
            createdAt: Between(new Date(startDate), new Date(endDate)),
          }),
        ...(operationTypeCategory && {
          operationTypeCategory: Like(`%${operationTypeCategory}%`),
        }),
        ...(operationTypeCategory && {
          operationType: { category: operationTypeCategory },
        }),
        ...(itemName && { item: { name: Like(`%${itemName}%`) } }),
      },
      order: {
        createdAt: 'DESC',
        id: 'DESC',
      },
    };

    const inventoryTransactions =
      await this.inventoryTransactionRepository.find(filters);

    // FIXME: DTO 활용하는 방향으로 개선.
    return inventoryTransactions.map((inventoryTransaction) => ({
      id: inventoryTransaction.id,
      item: {
        id: inventoryTransaction.item.id,
        name: inventoryTransaction.item.name,
        item_codes: inventoryTransaction.item.itemCodes.map((itemCode) => ({
          id: itemCode.id,
          code: itemCode.code,
        })),
        item_serials: inventoryTransaction.item.itemSerials.map(
          (itemSerial) => ({
            id: itemSerial.id,
            serial_no: itemSerial.serialNo,
          }),
        ),
      },
      location_departure: inventoryTransaction?.locationDeparture
        ? {
            id: inventoryTransaction.locationDeparture?.id,
            name: inventoryTransaction.locationDeparture?.name,
            zone: {
              id: inventoryTransaction.locationDeparture.zone.id,
              name: inventoryTransaction.locationDeparture.zone.name,
            },
          }
        : null,
      location_arrival: inventoryTransaction?.locationArrival
        ? {
            id: inventoryTransaction.locationArrival?.id,
            name: inventoryTransaction.locationArrival?.name,
            zone: {
              id: inventoryTransaction.locationArrival.zone.id,
              name: inventoryTransaction.locationArrival.zone.name,
            },
          }
        : null,
      // lot: {
      //   id: inventoryTransaction.lot.id,
      //   number: inventoryTransaction.lot.number,
      //   supplier: {
      //     id: inventoryTransaction.lot.supplier.id,
      //     number: inventoryTransaction.lot.supplier.name,
      //   },
      // },
      // TODO: Lot number 노출은 기획에 없어 supplier만 별도 노출
      supplier: inventoryTransaction?.lot?.supplier
        ? {
            id: inventoryTransaction.lot.supplier.id,
            number: inventoryTransaction.lot.supplier.name,
          }
        : null,
      category: inventoryTransaction.category,
      operation_type: {
        id: inventoryTransaction.operationType.id,
        name: inventoryTransaction.operationType.name,
      },
      input_type: inventoryTransaction.inputType,
      quantity: inventoryTransaction.quantity,
      remark: inventoryTransaction.remark,
      create_worker: inventoryTransaction.createWorker,
      created_at: inventoryTransaction.createdAt,
      updated_at: inventoryTransaction.updatedAt,
    }));
  }

  async findOne(id: number) {
    const inventoryTransaction = this.inventoryTransactionRepository.findOne({
      where: { id },
    });

    // TODO: 추후 응답포맷 확정될 때 같이 수정
    if (!inventoryTransaction) {
      return null;
    }

    return await inventoryTransaction;
  }

  async update(
    id: number,
    updateInventoryTransactionDto: UpdateInventoryTransactionDto,
  ) {
    return await this.inventoryTransactionRepository.update(
      id,
      updateInventoryTransactionDto,
    );
  }
}
