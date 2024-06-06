import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { Zone } from './entities/zone.entity';

@Injectable()
export class ZoneService {
  private zoneRepository: Repository<Zone>;

  constructor(@Inject('CONNECTION') private readonly dataSource: DataSource) {
    this.zoneRepository = this.dataSource.getRepository(Zone);
  }

  async create(createZoneDto: CreateZoneDto) {
    const zone = this.zoneRepository.create(createZoneDto);
    return await this.zoneRepository.save(zone);
  }

  async findAll() {
    const zones = await this.zoneRepository.find();

    return zones.map((zone) => ({
      id: zone.id,
      name: zone.name,
      code: zone.code,
      created_at: zone.createdAt,
    }));
  }

  async findOne(id: number) {
    const zone = await this.zoneRepository.findOne({
      where: { id },
    });

    // TODO: 추후 응답포맷 확정될 때 같이 수정
    if (!zone) {
      return null;
    }

    // FIXME: DTO 활용하는 방향으로 개선.
    return {
      id: zone.id,
      name: zone.name,
      code: zone.code,
      created_at: zone.createdAt,
    };
  }

  async update(id: number, updateZoneDto: UpdateZoneDto) {
    return await this.zoneRepository.update(id, updateZoneDto);
  }

  async remove(id: number) {
    return await this.zoneRepository.delete(id);
  }
}
