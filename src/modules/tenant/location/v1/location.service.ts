import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Like, Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { FindLocationDto } from './dto/find-location.dto';

@Injectable()
export class LocationService {
  private locationRepository: Repository<Location>;

  constructor(@Inject('CONNECTION') private readonly dataSource: DataSource) {
    this.locationRepository = this.dataSource.getRepository(Location);
  }

  async create(createLocationDto: CreateLocationDto) {
    const location = this.locationRepository.create(createLocationDto);

    location.createWorker = 'create_worker_name'; // TODO: 추후 변경 필요

    return await this.locationRepository.save(location);
  }

  async findAll(findLocationDto: FindLocationDto) {
    const { name, zoneName, warehouseId } = findLocationDto;
    const findOptions: any = {
      where: {
        ...(name && { name: Like(`%${name}%`) }),
        ...(zoneName && { zone: { name: Like(`%${zoneName}%`) } }),
        ...(warehouseId && { zone: { warehouse: { id: warehouseId } } }),
      },
      order: {
        name: 'ASC',
      },
    };

    const locations = await this.locationRepository.find(findOptions);

    // FIXME: DTO 활용하는 방향으로 개선.
    // return locations.map((location) => plainToClass(FindLocationDto, location));

    return locations.map((location) => ({
      id: location.id,
      name: location.name,
      stock_status: location.stockStatus,
      remark: location.remark,
      create_worker: location.createWorker,
      // created_at: location.createdAt,
      zone: {
        id: location.zone.id,
        name: location.zone.name,
      },
    }));
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findOne({
      where: { id },
    });

    // TODO: 추후 응답포맷 확정될 때 같이 수정
    if (!location) {
      return null;
    }

    // FIXME: DTO 활용하는 방향으로 개선.
    return {
      id: location.id,
      name: location.name,
      stock_status: location.stockStatus,
      remark: location.remark,
      create_worker: location.createWorker,
      // created_at: location.createdAt,
      zone: {
        id: location.zone.id,
        name: location.zone.name,
      },
    };
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    return await this.locationRepository.update(id, updateLocationDto);
  }

  async remove(id: number) {
    return await this.locationRepository.delete(id);
  }
}
