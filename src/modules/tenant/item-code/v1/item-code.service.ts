import { Inject, Injectable } from '@nestjs/common';
import { CreateItemCodeDto } from './dto/create-item-code.dto';
import { UpdateItemCodeDto } from './dto/update-item-code.dto';
import { DataSource, Repository } from 'typeorm';
import { ItemCode } from './entities/item-code.entity';

@Injectable()
export class ItemCodeService {
  private itemCodeRepository: Repository<ItemCode>;

  constructor(@Inject('CONNECTION') private readonly dataSource: DataSource) {
    this.itemCodeRepository = this.dataSource.getRepository(ItemCode);
  }

  async create(createItemCodeDto: CreateItemCodeDto) {
    const warehouse = this.itemCodeRepository.create(createItemCodeDto);

    return await this.itemCodeRepository.save(warehouse);
  }

  async findAll() {
    return await `This action returns all itemCode`;
  }

  async findOne(id: number) {
    const itemCode = this.itemCodeRepository.findOne({
      where: { id },
    });

    // TODO: 추후 응답포맷 확정될 때 같이 수정
    // if (!itemCode) {
    //   return null;
    // }

    return await itemCode;
  }

  async update(id: number, updateItemCodeDto: UpdateItemCodeDto) {
    return await this.itemCodeRepository.update(id, updateItemCodeDto);
  }

  async remove(id: number) {
    // TODO: 삭제 시 재고 확인 필요. 재고가 1개라도 있으면 삭제 불가.
    return await this.itemCodeRepository.delete(id);
  }
}
