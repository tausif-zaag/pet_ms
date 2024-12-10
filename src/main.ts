import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { createDatabaseIfNotExists } from './config/database.config';
import { configureWebSettings } from './config/web.config';
import { envConfig } from './constants/env.constant';
import { CustomLoggerService } from './logging/logger.service';
import { faviconMiddleware } from './middlewares/favicon.middleware';

async function bootstrap() {
    await createDatabaseIfNotExists();

    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    configureWebSettings(app);
    const customLogger = app.get(CustomLoggerService);
    app.useLogger(customLogger);
    app.use(faviconMiddleware);

    // Log application start
    customLogger.log('Application is starting...');

    process.on('unhandledRejection', (reason: any) => {
        customLogger.error(reason);
    });

    process.on('uncaughtException', (error: Error) => {
        customLogger.error(error);
        process.exit(1);
    });

    const config = new DocumentBuilder().setTitle('Pet Shop').setDescription('Pet Shop API description').setVersion('1.0').addTag('pet-shop').build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    await app.listen(envConfig.SERVER_PORT ?? 3000);
}

bootstrap();
