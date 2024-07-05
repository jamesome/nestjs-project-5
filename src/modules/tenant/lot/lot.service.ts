import { Inject, Injectable } from '@nestjs/common';
import { CreateLotDto } from './dto/create-lot.dto';
import { Lot } from './entities/lot.entity';
import { DataSource, Repository } from 'typeorm';
import { FindLotDto } from '../lot/dto/find-lot.dto';

@Injectable()
export class LotService {
  private lotRepository: Repository<Lot>;

  constructor(@Inject('CONNECTION') private readonly dataSource: DataSource) {
    this.lotRepository = this.dataSource.getRepository(Lot);
  }

  async create(createLotDto: CreateLotDto) {
    const lot = this.lotRepository.create(createLotDto);

    return await this.lotRepository.save(lot);
  }

  async findAll(findLotDto: FindLotDto) {
    const { supplierId, number } = findLotDto;
    const findOptions: any = {
      where: {
        ...(supplierId && { supplierId }),
        ...(number && { number }),
      },
    };

    return await this.lotRepository.find(findOptions);
  }

  async findOne(id: number) {
    return await this.lotRepository.findOne({
      where: { id },
    });
  }
}
