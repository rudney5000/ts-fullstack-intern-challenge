import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import initDatabase from '../backend/index';

async function bootstrap() {
  await initDatabase();
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:8080/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, X-User-Id',
    exposedHeaders: ['x-auth-token'],
  });
  await app.listen(3000);
}
bootstrap();
