import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const apiVersion = configService.get('API_VERSION');

  app.setGlobalPrefix(`api/${apiVersion}`);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
bootstrap();
