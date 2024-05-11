import { Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class ShopService {
  constructor(@InjectQueue('shops') private testQueue: Queue) {}

  create(createShopDto: CreateShopDto) {
    return 'This action adds a new shop';
  }

  findAll() {
    return `This action returns all shop`;
  }

  async addQueue(data: number) {
    return await this.testQueue.add(
      'testQueue',
      {
        dataId: data,
      },
      {
        delay: 3000,
      },
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} shop`;
  }

  update(id: number, updateShopDto: UpdateShopDto) {
    return `This action updates a #${id} shop`;
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }
}
