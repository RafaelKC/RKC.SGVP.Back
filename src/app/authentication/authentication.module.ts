import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GlobalModule } from 'src/global/global.module';
import { UsersModule } from '../users/users.module';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [
    UsersModule,
    GlobalModule,
    ConfigModule,
  ],
  providers: [
    AuthenticationService,
    LocalStrategy,
  ],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
