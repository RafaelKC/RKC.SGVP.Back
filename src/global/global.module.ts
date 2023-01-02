import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EncryptService } from './encrypt/encrypt.service';

@Module({
  providers: [EncryptService],
  exports: [EncryptService],
  imports: [ConfigModule]
})
export class GlobalModule {}
