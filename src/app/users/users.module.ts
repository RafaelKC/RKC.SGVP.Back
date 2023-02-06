import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserCredential } from 'rkc.base.back';
import { UsersService } from './users.service';
import { UsersCredentialsService } from './users-credentials/users-credentials.service';
import { ConfigModule } from '@nestjs/config';
import { GlobalModule } from 'src/global/global.module';
import { IUsersCredentialsService } from './users-credentials/iUsers-credentials.service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserCredential]), ConfigModule, GlobalModule],
  providers: [
    UsersService,
    {
      provide: IUsersCredentialsService,
      useClass: UsersCredentialsService,
    },
  ],
  exports: [UsersService, IUsersCredentialsService],
})
export class UsersModule {}
