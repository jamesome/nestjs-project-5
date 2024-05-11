import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { BullModule } from '@nestjs/bull';
import { ShopConsumer } from './shop-consumer';

@Module({
  controllers: [ShopController],
  providers: [ShopService, ShopConsumer],
  imports: [
    BullModule.registerQueue({
      name: 'shops',
    }),
  ],
})
export class ShopModule {}
