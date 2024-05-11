import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('shops')
export class ShopConsumer {
  private readonly logger = new Logger(ShopConsumer.name);

  @Process('testQueue')
  getMessageQueue(job: Job) {
    this.logger.log(`${job.id} 번 작업을 수신했습니다.`);
  }
}
