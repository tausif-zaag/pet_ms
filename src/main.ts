import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envConfig } from './constants/env.constant';
import { createDatabaseIfNotExists } from './config/database.config';
import { ValidationPipe } from '@nestjs/common';
import { configureWebSettings } from './config/web.config';

async function bootstrap() {
    await createDatabaseIfNotExists();

    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    configureWebSettings(app);

    await app.listen(envConfig.SERVER_PORT ?? 3000);
}

bootstrap();
