import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GlobalModule } from '../../global/global.module';
import { UsersModule } from '../users/users.module';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthenticationController } from './authentication.controller';
import { JwtStrategy } from './strategies/jwt-strategy';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    UsersModule,
    GlobalModule,
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('AUTH_JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('AUTH_TIME_TO_EXPIRE'),
          },
        };
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    PassportModule,
    CacheModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          ttl: Number(configService.get('REDIS_TIME_TO_EXPIRE')),
          store: redisStore,
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
