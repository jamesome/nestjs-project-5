import { Inject, Injectable } from '@nestjs/common';
import { CreateOptionV1Dto } from './dto/create-option-v1.dto';
import { UpdateOptionV1Dto } from './dto/update-option-v1.dto';
import { DataSource, Repository } from 'typeorm';
import { OptionV1 } from './entities/option-v1.entity';

@Injectable()
export class OptionV1Service {
  private optionV1Repository: Repository<OptionV1>;

  constructor(@Inject('CONNECTION') private readonly dataSource: DataSource) {
    this.optionV1Repository = this.dataSource.getRepository(OptionV1);
  }

  async create(createOptionV1Dto: CreateOptionV1Dto) {
    const warehouse = this.optionV1Repository.create(createOptionV1Dto);
    return await this.optionV1Repository.save(warehouse);
  }

  findAll() {
    return `This action returns all optionV1`;
  }

  findOne(id: number) {
    return `This action returns a #${id} optionV1`;
  }

  update(id: number, updateOptionV1Dto: UpdateOptionV1Dto) {
    return `This action updates a #${id} optionV1` + updateOptionV1Dto;
  }

  remove(id: number) {
    return `This action removes a #${id} optionV1`;
  }
}
