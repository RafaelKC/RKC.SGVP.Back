import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Buy from './entities/buy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Buy])],
})
export class BuyModule {}
