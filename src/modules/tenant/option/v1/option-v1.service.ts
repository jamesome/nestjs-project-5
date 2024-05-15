import { Injectable } from '@nestjs/common';
import { CreateOptionV1Dto } from './dto/create-option-v1.dto';
import { UpdateOptionV1Dto } from './dto/update-option-v1.dto';

@Injectable()
export class OptionV1Service {
  create(createOptionV1Dto: CreateOptionV1Dto) {
    return 'This action adds a new optionV1' + createOptionV1Dto;
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
