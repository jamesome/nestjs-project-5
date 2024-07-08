import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { FindTransactionDto } from './dto/find-transaction.dto';
import { Between, DataSource, Like, Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { IncomingInventoryItemDto } from '../inventory-item/dto/incoming-inventory-item.dto';
import { MovementInventoryItemDto } from '../inventory-item/dto/movement-inventory-item.dto';
import { plainToInstance } from 'class-transformer';
import { I18nService, I18nValidationError } from 'nestjs-i18n';
import { InventoryItem } from '../inventory-item/entities/inventory-item.entity';
import { Category, InputType } from '../enum';
import { Lot } from '../lot/entities/lot.entity';
import { LotService } from '../lot/lot.service';
import { CreateLotDto } from '../lot/dto/create-lot.dto';
import { ItemSerial } from '../item-serial/entities/item-serial.entity';
import { CreateTransactionItemDto } from '../transaction-item/dto/create-transaction-item.dto';
import { TransactionItem } from '../transaction-item/entities/transaction-item.entity';

@Injectable()
export class TransactionService {
  private transactionRepository: Repository<Transaction>;
  private inventoryItemRepository: Repository<InventoryItem>;
  private itemSerialRepository: Repository<ItemSerial>;

  constructor(
    @Inject('CONNECTION') private readonly dataSource: DataSource,
    private readonly i18n: I18nService,
    private lotService: LotService,
  ) {
    this.transactionRepository = this.dataSource.getRepository(Transaction);
    this.inventoryItemRepository = this.dataSource.getRepository(InventoryItem);
    this.itemSerialRepository = this.dataSource.getRepository(ItemSerial);
  }

  async create(createTransactionDto: CreateTransactionDto) {
    const transaction = this.transactionRepository.create(createTransactionDto);

    return await this.transactionRepository.save(transaction);
  }

  async incoming(incomingInventoryItemDto: IncomingInventoryItemDto[]) {
    const failures: {
      index: number;
      children: object[] | I18nValidationError;
      constraints: object;
    }[] = [];
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const createTransactionDto: CreateTransactionDto = {
      category: Category.INCOMING,
      inputType: InputType.WEB_INCOMING,
      createWorker: 'create_worker_name', // TODO: 추후, User로 대체
    };

    const transaction = await queryRunner.manager.insert(
      Transaction,
      createTransactionDto,
    );
    const transactionId = transaction.identifiers[0].id;

    for (const [index, dto] of incomingInventoryItemDto.entries()) {
      const incomingDtoInstance = plainToInstance(
        IncomingInventoryItemDto,
        dto,
      );

      const validationErrors = await this.i18n.validate(incomingDtoInstance);

      if (validationErrors.length > 0) {
        failures.push({
          index,
          children: validationErrors.map((error) => ({
            value: error.value,
            property: error.property,
            children: error.children,
            constraints: error.constraints,
          })),
          constraints: {},
        });

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
      if (inventoryItemRecord) {
        if (lotId !== inventoryItemRecord.lotId) {
          failures.push({
            index,
            children: [
              {
                value: inventoryItemRecord.lotId,
                property: 'lot_no',
                children: [],
                constraints: { equals: this.i18n.t('error.LOT_ID_MISMATCH') },
              },
            ],
            constraints: {},
          });

          continue;
        }

        if (incomingDtoInstance.status !== inventoryItemRecord.status) {
          failures.push({
            index,
            children: [
              {
                value: incomingDtoInstance.status,
                property: 'status',
                children: [],
                constraints: { equals: this.i18n.t('error.STATUS_MISMATCH') },
              },
            ],
            constraints: {},
          });

          continue;
        }
      }

      await queryRunner.startTransaction();

      try {
        const createTransactionItemDto: CreateTransactionItemDto = {
          transactionId: transactionId,
          itemId: incomingDtoInstance.itemId,
          locationDepartureId: null,
          locationArrivalId: incomingDtoInstance.locationId,
          lotId: lotId,
          supplierId: incomingDtoInstance.supplierId,
          operationTypeId: incomingDtoInstance.operationTypeId,
          quantity: incomingDtoInstance.quantity,
          status: incomingDtoInstance.status,
          remark: incomingDtoInstance.remark,
        };

        const transactionItemValidationErrors = await this.i18n.validate(
          createTransactionItemDto,
        );

        if (transactionItemValidationErrors.length > 0) {
          failures.push({
            index,
            children: validationErrors.map((error) => ({
              value: error.value,
              property: error.property,
              children: error.children,
              constraints: error.constraints,
            })),
            constraints: {},
          });

          await queryRunner.rollbackTransaction();
          continue;
        }

        await queryRunner.manager.insert(
          TransactionItem,
          createTransactionItemDto,
        );

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
              expirationDate: incomingDtoInstance.expirationDate
                ? incomingDtoInstance.expirationDate
                : null,
            };

            const lotValidationErrors = await this.i18n.validate(createLotDto);

            if (lotValidationErrors.length > 0) {
              failures.push({
                index,
                children: validationErrors.map((error) => ({
                  value: error.value,
                  property: error.property,
                  children: error.children,
                  constraints: error.constraints,
                })),
                constraints: {},
              });

              await queryRunner.rollbackTransaction();
              continue;
            }

            lot = await this.lotService.create(createLotDto);
            lotId = lot.id;
          }

          const newInventoryItem = this.inventoryItemRepository.create({
            itemId: incomingDtoInstance.itemId,
            locationId: incomingDtoInstance.locationId,
            quantity: incomingDtoInstance.quantity,
            status: incomingDtoInstance.status,
            lotId: lot?.id,
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

        await queryRunner.commitTransaction();
      } catch (error) {
        // TODO: sentry
        console.log(error);
        failures.push({
          index,
          children: [],
          constraints: { error: this.i18n.t('error.SERVER_ERROR') },
        });

        await queryRunner.rollbackTransaction();
      }
    }

    return failures;
  }

  async movement(movementInventoryItemDto: MovementInventoryItemDto[]) {
    const failures: {
      index: number;
      children: object[] | I18nValidationError;
      constraints: object;
    }[] = [];
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const createTransactionDto: CreateTransactionDto = {
      category: Category.MOVEMENT,
      inputType: InputType.WEB_LOCATION_MOVEMENT,
      createWorker: 'create_worker_name', // TODO: 추후, User로 대체
    };

    const transaction = await queryRunner.manager.insert(
      Transaction,
      createTransactionDto,
    );
    const transactionId = transaction.identifiers[0].id;

    for (const [index, dto] of movementInventoryItemDto.entries()) {
      const movementDtoInstance = plainToInstance(
        MovementInventoryItemDto,
        dto,
      );

      const validationErrors = await this.i18n.validate(movementDtoInstance);

      if (validationErrors.length > 0) {
        failures.push({
          index,
          children: validationErrors.map((error) => ({
            value: error.value,
            property: error.property,
            children: error.children,
            constraints: error.constraints,
          })),
          constraints: {},
        });

        continue;
      }

      const departureFilters: any = {
        itemId: movementDtoInstance.itemId,
        locationId: movementDtoInstance.locationDepartureId,
      };

      const departureRecord = await this.inventoryItemRepository.findOne({
        where: departureFilters,
      });

      if (!departureRecord) {
        failures.push({
          index,
          children: [
            {
              value: movementDtoInstance.itemId,
              property: 'itemId',
              children: [],
              constraints: { isNotEmpty: this.i18n.t('error.ITEM_NOT_FOUND') },
            },
          ],
          constraints: {},
        });

        continue;
      }

      if (movementDtoInstance.quantity > departureRecord.quantity) {
        failures.push({
          index,
          children: [
            {
              value: movementDtoInstance.quantity,
              property: 'quantity',
              children: [],
              constraints: { min: this.i18n.t('error.NOT_ENOUGH_QUANTITY') },
            },
          ],
          constraints: {},
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

      if (arrivalRecord) {
        if (movementDtoInstance.lotId !== arrivalRecord.lotId) {
          failures.push({
            index,
            children: [
              {
                value: movementDtoInstance.lotId,
                property: 'lot_id',
                children: [],
                constraints: { equals: this.i18n.t('error.LOT_ID_MISMATCH') },
              },
            ],
            constraints: {},
          });

          continue;
        }

        if (movementDtoInstance.status !== arrivalRecord.status) {
          failures.push({
            index,
            children: [
              {
                value: movementDtoInstance.status,
                property: 'status',
                children: [],
                constraints: { equals: this.i18n.t('error.STATUS_MISMATCH') },
              },
            ],
            constraints: {},
          });

          continue;
        }
      }

      await queryRunner.startTransaction();

      try {
        const createTransactionItemDto: CreateTransactionItemDto = {
          transactionId: transactionId,
          itemId: movementDtoInstance.itemId,
          locationDepartureId: null,
          locationArrivalId: movementDtoInstance.locationArrivalId,
          lotId: movementDtoInstance?.lotId,
          supplierId: null,
          operationTypeId: movementDtoInstance.operationTypeId,
          quantity: movementDtoInstance.quantity,
          status: movementDtoInstance.status,
          remark: movementDtoInstance.remark,
        };

        const transactionItemValidationErrors = await this.i18n.validate(
          createTransactionItemDto,
        );

        if (transactionItemValidationErrors.length > 0) {
          failures.push({
            index,
            children: validationErrors.map((error) => ({
              value: error.value,
              property: error.property,
              children: error.children,
              constraints: error.constraints,
            })),
            constraints: {},
          });

          await queryRunner.rollbackTransaction();
          continue;
        }

        await queryRunner.manager.insert(
          TransactionItem,
          createTransactionItemDto,
        );

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

        await queryRunner.commitTransaction();
      } catch (error) {
        // TODO: sentry
        console.log(error);
        failures.push({
          index,
          children: [],
          constraints: { error: this.i18n.t('error.SERVER_ERROR') },
        });

        await queryRunner.rollbackTransaction();
      }
    }

    return failures;
  }

  // async outgoing(OutgoingInventoryItemDto: OutgoingInventoryItemDto[]) {
  //   console.log(OutgoingInventoryItemDto);
  // }

  async findAll(findTransactionDto: FindTransactionDto) {
    const { startDate, endDate, category, itemName } = findTransactionDto;
    const filters: any = {
      relations: {
        transactionItems: {
          item: true,
          supplier: true,
          operationType: true,
          locationDeparture: { zone: true },
          locationArrival: { zone: true },
        },
      },
      where: {
        ...(startDate &&
          endDate && {
            createdAt: Between(new Date(startDate), new Date(endDate)),
          }),
        ...(category && { category }),
        ...(itemName && {
          transactionItems: { item: { name: Like(`%${itemName}%`) } },
        }),
      },
      order: {
        createdAt: 'DESC',
        id: 'DESC',
        transactionItems: { id: 'DESC' },
      },
    };

    return await this.transactionRepository.find(filters);
  }

  async findOne(id: number) {
    const transaction = this.transactionRepository.findOne({
      relations: {
        transactionItems: {
          item: true,
          supplier: true,
          operationType: true,
          locationDeparture: { zone: true },
          locationArrival: { zone: true },
        },
      },
      where: { id },
    });

    return await transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    await this.transactionRepository.update(id, updateTransactionDto);
  }
}
