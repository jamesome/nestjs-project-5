import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Like, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { FindItemDto } from './dto/find-item.dto';
import { InventoryItem } from '../inventory-item/entities/inventory-item.entity';
import { IncomingInventoryItemDto } from '../inventory-item/dto/incoming-inventory-item.dto';
import { ItemSerial } from '../item-serial/entities/item-serial.entity';
import { LotService } from '../lot/lot.service';
import { CreateLotDto } from '../lot/dto/create-lot.dto';
import { Lot } from '../lot/entities/lot.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { TransactionService } from '../transaction/transaction.service';
import { CreateTransactionDto } from '../transaction/dto/create-transaction.dto';
import { Category, InputType } from '../enum';
import { MovementInventoryItemDto } from '../inventory-item/dto/movement-inventory-item.dto';
import { I18nService } from 'nestjs-i18n';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ItemService {
  private itemRepository: Repository<Item>;
  private inventoryItemRepository: Repository<InventoryItem>;
  private itemSerialRepository: Repository<ItemSerial>;

  constructor(
    @Inject('CONNECTION') private readonly dataSource: DataSource,
    private lotService: LotService,
    private transactionService: TransactionService,
    private readonly i18n: I18nService,
  ) {
    this.itemRepository = this.dataSource.getRepository(Item);
    this.inventoryItemRepository = this.dataSource.getRepository(InventoryItem);
    this.itemSerialRepository = this.dataSource.getRepository(ItemSerial);
  }

  async create(createItemDto: CreateItemDto) {
    const item = this.itemRepository.create(createItemDto);

    return await this.itemRepository.save(item);
  }

  // TODO: TransactionService으로 이동. 프론트 해결되면 추후 삭제.
  async inbound(incomingInventoryItemDto: IncomingInventoryItemDto[]) {
    const failures: { index: number; error: string[] }[] = [];
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    for (const [index, dto] of incomingInventoryItemDto.entries()) {
      const incomingDtoInstance = plainToInstance(
        IncomingInventoryItemDto,
        dto,
      );
      const validationErrors = await this.i18n.validate(incomingDtoInstance);

      // TODO: 공용으로 사용할 수 있을 듯
      if (validationErrors.length > 0) {
        const errorMessages: string[] = [];

        for (const error of validationErrors) {
          if (error.constraints) {
            errorMessages.push(...Object.values(error.constraints));
          } else {
            errorMessages.push('Validation error');
          }
        }

        failures.push({ index, error: errorMessages });

        continue;
      }

      const filters: any = {
        itemId: incomingDtoInstance.itemId,
        locationId: incomingDtoInstance.locationId,
      };
      const inventoryItemRecord = await this.inventoryItemRepository.findOne({
        where: filters,
      });

      let lot: Lot | null = null;
      let lotId: number | null = null;

      if (incomingDtoInstance.lotNo) {
        const lots = await this.lotService.findAll({
          number: incomingDtoInstance.lotNo,
          supplierId: incomingDtoInstance.supplierId,
        });
        lotId = lots[0]?.id ?? null;
      }

      // 한 location에 한 품목만 존재
      // location에 품목이 있고,
      // 1. inventory_item에 lot_id == null이고 입력 된 lotNo가 있거나,
      // 2. lot_id가 서로 다르거나,
      // 3. 재고상태(status)가 서로 다르면,
      // 반복문 탈출
      if (
        inventoryItemRecord &&
        ((!inventoryItemRecord?.lotId && incomingDtoInstance.lotNo) ||
          inventoryItemRecord?.lotId != lotId ||
          inventoryItemRecord.status !== incomingDtoInstance.status)
      ) {
        failures.push({
          index,
          error: [this.i18n.t('error.INCOMING_NOT_ALLOWED')],
        });

        continue;
      }

      await queryRunner.startTransaction();

      try {
        if (inventoryItemRecord) {
          await queryRunner.manager.update(InventoryItem, filters, {
            quantity:
              inventoryItemRecord.quantity + incomingDtoInstance.quantity,
          });
        } else {
          if (
            incomingDtoInstance.lotNo &&
            incomingDtoInstance.supplierId &&
            !lotId
          ) {
            const createLotDto: CreateLotDto = {
              itemId: incomingDtoInstance.itemId,
              supplierId: incomingDtoInstance.supplierId,
              number: incomingDtoInstance.lotNo,
              expirationDate: incomingDtoInstance.expirationDate,
            };

            lot = await this.lotService.create(createLotDto);
            lotId = lot.id;
          }

          const newInventoryItem = this.inventoryItemRepository.create({
            itemId: incomingDtoInstance.itemId,
            locationId: incomingDtoInstance.locationId,
            quantity: incomingDtoInstance.quantity,
            status: incomingDtoInstance.status,
            lotId: lotId,
          });

          await queryRunner.manager.insert(InventoryItem, newInventoryItem);
        }

        if (incomingDtoInstance.itemSerial.serialNo) {
          const newInventoryItem = this.itemSerialRepository.create({
            itemId: incomingDtoInstance.itemId,
            serialNo: incomingDtoInstance.itemSerial.serialNo,
          });

          await queryRunner.manager.insert(ItemSerial, newInventoryItem);
        }

        const createTransactionDto: CreateTransactionDto = {
          itemId: incomingDtoInstance.itemId,
          locationDepartureId: null,
          locationArrivalId: incomingDtoInstance.locationId,
          lotId: lotId,
          supplierId: incomingDtoInstance.supplierId,
          operationTypeId: incomingDtoInstance.operationTypeId,
          category: Category.INCOMING,
          inputType: InputType.WEB_INCOMING,
          quantity: incomingDtoInstance.quantity,
          remark: incomingDtoInstance.remark,
          createWorker: 'create_worker_name', // TODO: 추후, User로 대체
        };

        await this.transactionService.create(createTransactionDto);

        await queryRunner.commitTransaction();
      } catch (error) {
        // TODO: sentry
        console.log(error);
        failures.push({
          index,
          error: [this.i18n.t('error.SERVER_ERROR')],
        });

        await queryRunner.rollbackTransaction();
      }
    }

    // TODO: 문제가 생길 경우에 코드 추가.
    // await queryRunner.release();

    return failures;
  }

  // TODO: TransactionService으로 이동. 프론트 해결되면 추후 삭제.
  async movement(movementInventoryItemDto: MovementInventoryItemDto[]) {
    const failures: { index: number; error: string[] }[] = [];
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    for (const [index, dto] of movementInventoryItemDto.entries()) {
      const movementDtoInstance = plainToInstance(
        MovementInventoryItemDto,
        dto,
        { exposeDefaultValues: true },
      );

      const validationErrors = await this.i18n.validate(movementDtoInstance);

      // TODO: 공용으로 사용할 수 있을 듯
      if (validationErrors.length > 0) {
        const errorMessages: string[] = [];

        for (const error of validationErrors) {
          if (error.constraints) {
            errorMessages.push(...Object.values(error.constraints));
          } else {
            errorMessages.push('Validation error');
          }
        }

        failures.push({ index, error: errorMessages });

        continue;
      }

      const departureFilters: any = {
        itemId: movementDtoInstance.itemId,
        locationId: movementDtoInstance.locationDepartureId,
      };
      const departureRecord = await this.inventoryItemRepository.findOne({
        where: departureFilters,
      });

      if (
        !departureRecord ||
        movementDtoInstance.quantity > departureRecord?.quantity
      ) {
        failures.push({
          index,
          error: [this.i18n.t('error.NOT_ENOUGH_QUANTITY')],
        });

        continue;
      }

      const arrivalFilters: any = {
        itemId: movementDtoInstance.itemId,
        locationId: movementDtoInstance.locationArrivalId,
      };
      const arrivalRecord = await this.inventoryItemRepository.findOne({
        where: arrivalFilters,
      });

      // TODO: 추후, 수정 필요.
      // 하나의 SKU가 동일 로케이션에서 서로 다른 LOT번호를 가질 수 있는가?
      // 대부분 필요 없지만, 대부분의 WMS에서는 설정 가능 함
      if (
        arrivalRecord &&
        (arrivalRecord?.lotId !== movementDtoInstance.lotId ||
          arrivalRecord.status !== movementDtoInstance.status)
      ) {
        failures.push({
          index,
          error: [this.i18n.t('error.CANNOT_MOVE')],
        });

        continue;
      }

      await queryRunner.startTransaction();

      try {
        const minusQuantity =
          departureRecord.quantity - movementDtoInstance.quantity;

        if (minusQuantity === 0) {
          await queryRunner.manager.delete(InventoryItem, departureFilters);
        } else {
          await queryRunner.manager.update(InventoryItem, departureFilters, {
            quantity: minusQuantity,
          });
        }

        if (arrivalRecord) {
          const plusQuantity =
            arrivalRecord.quantity + movementDtoInstance.quantity;

          await queryRunner.manager.update(InventoryItem, arrivalFilters, {
            quantity: plusQuantity,
          });
        } else {
          const newInventoryItem = this.inventoryItemRepository.create({
            itemId: movementDtoInstance.itemId,
            locationId: movementDtoInstance.locationArrivalId,
            quantity: movementDtoInstance.quantity,
            status: movementDtoInstance.status,
            lotId: departureRecord?.lotId,
          });

          await queryRunner.manager.insert(InventoryItem, newInventoryItem);
        }

        const createTransactionDto: CreateTransactionDto = {
          itemId: movementDtoInstance.itemId,
          locationDepartureId: movementDtoInstance.locationDepartureId,
          locationArrivalId: movementDtoInstance.locationArrivalId,
          lotId: departureRecord?.lotId,
          supplierId: null,
          operationTypeId: movementDtoInstance.operationTypeId,
          category: Category.MOVEMENT,
          inputType: InputType.WEB_LOCATION_MOVEMENT,
          quantity: movementDtoInstance.quantity,
          remark: movementDtoInstance.remark,
          createWorker: 'create_worker_name', // TODO: 추후, User로 대체
        };

        await this.transactionService.create(createTransactionDto);

        await queryRunner.commitTransaction();
      } catch (error) {
        // TODO: sentry
        console.log(error);
        failures.push({
          index,
          error: [this.i18n.t('error.SERVER_ERROR')],
        });

        await queryRunner.rollbackTransaction();
      }
    }

    return failures;
  }

  async find(findItemDto: FindItemDto) {
    const { includeInventory, include } = findItemDto;

    // TODO: include 추가 되면 includeInventory삭제
    if (includeInventory || include === 'inventory') {
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

    return await queryBuilder.getManyItem();
  }

  async getManyItemsWithOutInventoryList(findItemDto: FindItemDto) {
    const { name, property, itemCode, locationId } = findItemDto;
    const filters: any = {
      // relations: {
      //   inventoryItems: true,
      // },
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

    return await this.itemRepository.find(filters);
  }

  async findOne(id: number) {
    const item = this.itemRepository.findOne({
      where: { id },
    });

    return await item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    await this.itemRepository.update(id, updateItemDto);
  }

  async remove(id: number) {
    await this.itemRepository.softDelete(id);
  }
}
