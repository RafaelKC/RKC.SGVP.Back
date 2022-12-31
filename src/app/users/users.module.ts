import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserCredential } from 'rkc.base.back';
import { UsersService } from './users.service';
import { UsersCredentialsService } from './users-credentials/users-credentials.service';
import { EncryptService } from 'src/global/encrypt/encrypt.service';
import { ConfigModule } from '@nestjs/config';
import { GlobalModule } from 'src/global/global.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserCredential]), ConfigModule, GlobalModule],
  providers: [UsersService, UsersCredentialsService]
})
export class UsersModule {}
