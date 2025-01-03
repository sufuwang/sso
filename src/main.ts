import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppFilter } from './app.filter';
import { AppInterceptor } from './app.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new AppInterceptor());
  app.useGlobalFilters(new AppFilter());
  await app.listen(3000);
}
bootstrap();
