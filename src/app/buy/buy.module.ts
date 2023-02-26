import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyService } from './BuyService';
import Buy from './entities/buy.entity';
import { IBuyService } from './iBuy.service.interface';
import { BuyController } from './buy.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Buy])],
  providers: [
    {
      provide: IBuyService,
      useClass: BuyService,
    },
  ],
  controllers: [BuyController],
})
export class BuyModule {}
