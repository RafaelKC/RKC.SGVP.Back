import { Module } from '@nestjs/common';
import { EncryptService } from './encrypt/encrypt.service';

@Module({
  providers: [EncryptService]
})
export class GlobalModule {}
