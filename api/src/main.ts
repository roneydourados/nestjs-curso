import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LogInterceptor } from './interceptors/log.interceptor';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  //peipe para validação de dados
  //app.useGlobalPipes(new ValidationPipe());

  // aqui vai interceptar todos os controllers que existir dentro da aplicação
  app.useGlobalInterceptors(new LogInterceptor());

  app.enableShutdownHooks();

  await app.listen(3000);
};

bootstrap();
