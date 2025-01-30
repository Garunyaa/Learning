import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

const port = process.env.PORT || 3000;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const firstError = errors[0];
        const errorMessage = Object.values(firstError.constraints)[0];
        return new BadRequestException({
          status: false,
          status_code: 400,
          message: errorMessage,
          data: {},
        });
      },
    })
  );

  await app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
  });
}
bootstrap();
