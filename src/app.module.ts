import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserCredential } from 'rkc.base.back';
import { UsersModule } from './app/users/users.module';
import { GlobalModule } from './global/global.module';
import { AuthenticationModule } from './app/authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [
          __dirname + '/**/*.entity.ts',
          User,
          UserCredential
        ],
        synchronize: configService.get<boolean>('PROD'),
      }),
      inject: [ConfigService]
    }),
    UsersModule,
    GlobalModule,
    AuthenticationModule
  ]
})
export class AppModule { }
