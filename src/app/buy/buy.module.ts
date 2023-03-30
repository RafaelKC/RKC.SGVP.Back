import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Buy from './entities/buy.entity';
import { IBuyService } from './iBuy.service.interface';
import { BuyController } from './buy.controller';
import { BuyService } from './buy.service';

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
