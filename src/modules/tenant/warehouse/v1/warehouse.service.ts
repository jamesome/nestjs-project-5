import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse } from './entities/warehouse.entity';
import { FindWarehouseDto } from './dto/find-warehouse.dto';

@Injectable()
export class WarehouseService {
  private warehouseRepository: Repository<Warehouse>;

  constructor(@Inject('CONNECTION') private readonly dataSource: DataSource) {
    this.warehouseRepository = this.dataSource.getRepository(Warehouse);
  }

  async create(createWarehouseDto: CreateWarehouseDto) {
    const warehouse = this.warehouseRepository.create(createWarehouseDto);

    warehouse.createWorker = 'create_worker_name'; // TODO: 추후 변경 필요

    return await this.warehouseRepository.save(warehouse);
  }

  async findAll(findWarehouseDto: FindWarehouseDto) {
    // FIXME: Find Option으로 아래쿼리 구현이 안 됨
    // WHERE ( `warehouse`.`id` = ? AND `warehouse`.`code` like ? AND (`warehouse`.`address` like ? or `warehouse`.`detail_address` like ?) )
    // const { id, name, code, address } = findWarehouseDto;
    // const findOptions: any = {
    //   where: [
    //     {
    //       ...(id && { id }),
    //       ...(name && { name: Like(`%${name}%`) }),
    //       ...(code && { code: Like(`%${code}%`) }),
    //       ...(address && [
    //         { address: Like(`%${address}%`) },
    //         { detailAddress: Like(`%${address}%`) },
    //       ]),
    //     },
    //   ],
    //   order: {
    //     name: 'ASC',
    //   },
    // };

    // // FIXME: DTO 활용하는 방향으로 개선.
    // const warehouses = await this.warehouseRepository.find(findOptions);

    // return warehouses.map((warehouse) => ({
    //   id: warehouse.id,
    //   name: warehouse.name,
    //   code: warehouse.code,
    //   post_code: warehouse.postCode,
    //   address: warehouse.address,
    //   detail_address: warehouse.detailAddress,
    //   manager: warehouse.manager,
    //   contact: warehouse.contact,
    //   create_worker: warehouse.createWorker,
    //   created_at: warehouse.createdAt,
    // }));

    const { id, name, code, address } = findWarehouseDto;
    const queryBuilder =
      this.warehouseRepository.createQueryBuilder('warehouse');

    id && queryBuilder.andWhere('warehouse.id = :id', { id });
    name &&
      queryBuilder.andWhere('warehouse.name like :name', { name: `%${name}%` });
    code &&
      queryBuilder.andWhere('warehouse.code like :code', { code: `%${code}%` });
    address &&
      queryBuilder.andWhere(
        '(warehouse.address like :address or warehouse.detailAddress like :detailAddress)',
        {
          address: `%${address}%`,
          detailAddress: `%${address}%`,
        },
      );
    queryBuilder.orderBy({ 'warehouse.name': 'ASC' });

    return await queryBuilder.getMany();
  }

  async findOne(id: number) {
    const warehouse = await this.warehouseRepository.findOne({
      where: { id },
    });

    // TODO: 추후 응답포맷 확정될 때 같이 수정
    // if (!warehouse) {
    //   return null;
    // }

    return warehouse;
  }

  async update(id: number, updateWarehouseDto: UpdateWarehouseDto) {
    return await this.warehouseRepository.update(id, updateWarehouseDto);
  }

  async remove(id: number) {
    // TODO: 삭제 시 재고 확인 필요. 재고가 1개라도 있으면 삭제 불가.
    return await this.warehouseRepository.delete(id);
  }
}
