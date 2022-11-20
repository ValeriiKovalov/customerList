import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('Server listening on port:', config.port);

  await app.listen(config.port);
}
bootstrap();
