import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GlobalModule } from 'src/global/global.module';
import { UsersModule } from '../users/users.module';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthenticationController } from './authentication.controller';
import { JwtStrategy } from './strategies/jwt-strategy';

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
            expiresIn: configService.get('AUTH_TIME_TO_EXPIRE')
          }
        }},
        imports: [ConfigModule],
        inject: [ConfigService],
    }),
    PassportModule
  ],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
