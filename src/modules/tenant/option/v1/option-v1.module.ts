import { Module } from '@nestjs/common';
import { OptionV1Service } from './option-v1.service';
import { OptionV1Controller } from './option-v1.controller';

@Module({
  controllers: [OptionV1Controller],
  providers: [OptionV1Service],
})
export class OptionV1Module {}
