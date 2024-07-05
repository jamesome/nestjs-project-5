import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Like, Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { FindLocationDto } from './dto/find-location.dto';
import { EntityValidationService } from 'src/common/helpers/entity-validation.service';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class LocationService {
  private locationRepository: Repository<Location>;

  constructor(
    @Inject('CONNECTION') private readonly dataSource: DataSource,
    private readonly entityValidationService: EntityValidationService,
  ) {
    this.locationRepository = this.dataSource.getRepository(Location);
  }

  async create(createLocationDto: CreateLocationDto) {
    const location = this.locationRepository.create(createLocationDto);

    location.createWorker = 'create_worker_name'; // TODO: 추후 변경 필요

    return await this.locationRepository.save(location);
  }

  // async findAll(findLocationDto: FindLocationDto) {
  //   const { name, zoneName, warehouseId, warehouseIsDefault } = findLocationDto;
  //   const filters: any = {
  //     relations: { zone: true },
  //     where: {
  //       ...(name && { name: Like(`%${name}%`) }),
  //       ...(zoneName && { zone: { name: Like(`%${zoneName}%`) } }),
  //       ...(warehouseId && { zone: { warehouse: { id: warehouseId } } }),
  //       ...(warehouseIsDefault && {
  //         zone: { warehouse: { isDefault: warehouseIsDefault } },
  //       }),
  //     },
  //     order: {
  //       name: 'ASC',
  //     },
  //   };

  //   const locations = await this.locationRepository.find(filters);

  //   // TODO: 스네이크 케이스로 return 하기 위해 정제.
  //   return locations.map((location) => ({
  //     id: location.id,
  //     name: location.name,
  //     stock_status: location.stockStatus,
  //     remark: location.remark,
  //     create_worker: location.createWorker,
  //     created_at: location.createdAt,
  //     is_default: location.isDefault,
  //     zone: {
  //       id: location.zone.id,
  //       name: location.zone.name,
  //       is_default: location.zone.isDefault,
  //     },
  //   }));
  // }

  async findAll(warehouseId: number | null, findLocationDto: FindLocationDto) {
    console.log(warehouseId);
    const { name, zoneName, warehouseIsDefault } = findLocationDto;
    const filters: any = {
      relations: { zone: true },
      where: {
        zone: {
          warehouse: {
            id: warehouseId,
          },
        },
        ...(name && { name: Like(`%${name}%`) }),
        ...(zoneName && { zone: { name: Like(`%${zoneName}%`) } }),
        ...(warehouseIsDefault && {
          zone: { warehouse: { isDefault: warehouseIsDefault } },
        }),
      },
      order: {
        name: 'ASC',
      },
    };

    const locations = await this.locationRepository.find(filters);

    // strategy: ClassTransformOptions 설명
    // excludeAll :: Entity에 @Expose() 된 항목만 노출
    // exposeAll :: Entity 전체 노출
    return instanceToPlain(locations, { strategy: 'excludeAll' });
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findOne({
      relations: { zone: true },
      where: { id },
    });

    // TODO: 추후 응답포맷 확정될 때 같이 수정
    this.entityValidationService.validateExistence(location);

    // FIXME: DTO 활용하는 방향으로 개선.
    return {
      id: location.id,
      name: location.name,
      stock_status: location.stockStatus,
      remark: location.remark,
      create_worker: location.createWorker,
      created_at: location.createdAt,
      is_default: location.isDefault,
      zone: {
        id: location.zone.id,
        name: location.zone.name,
        is_default: location.isDefault,
      },
    };
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    return await this.locationRepository.update(id, updateLocationDto);
  }

  async remove(id: number) {
    const location = await this.locationRepository.findOne({
      relations: { inventoryItems: true },
      where: { id },
    });

    this.entityValidationService.handleEntityDelete(location);

    // TODO: 확인 로직도 별도 처리
    if (location?.inventoryItems) {
      this.entityValidationService.validateAssociatedItems();
    }

    await this.locationRepository.delete(id);
  }
}
