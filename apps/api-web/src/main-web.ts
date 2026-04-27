/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

const config = new DocumentBuilder()
  .setTitle('ERP API')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const port = process.env.PORT || 3000;
  const document = SwaggerModule.createDocument(app, config);

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ZodValidationPipe());

  app.use('/api-docs', apiReference({ content: document }));

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
