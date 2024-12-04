import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Client } from 'pg';
import { envConfig } from '../constants/env.constant';
import * as process from 'node:process';

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: envConfig.DB_HOST,
    port: +envConfig.DB_PORT,
    username: envConfig.DB_USERNAME,
    password: envConfig.DB_PASSWORD,
    database: envConfig.DB_NAME,
    synchronize: true, // Enable this only for development; be cautious in production!
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    extra: {
        connectionLimit: 10,
    },
};

export const createDatabaseIfNotExists = async () => {
    const dbName = envConfig.DB_NAME;

    if (!dbName) {
        console.error('DB_NAME environment variable is not defined.');
        process.exit(1);
    }

    const client = new Client({
        host: envConfig.DB_HOST,
        user: envConfig.DB_USERNAME,
        password: envConfig.DB_PASSWORD,
    });

    try {
        await client.connect();

        // Use parameterized queries to prevent SQL injection
        const result = await client.query(
            'SELECT 1 FROM pg_database WHERE datname = $1',
            [dbName],
        );

        if (result.rowCount === 0) {
            // Create the database with a parameterized query to prevent SQL injection
            await client.query('CREATE DATABASE $1', [dbName]);
            console.log(`Database "${dbName}" created successfully.`);
        } else {
            console.log(`Database "${dbName}" already exists.`);
        }
    } catch (error) {
        console.error('Error creating the database:', error);
    } finally {
        // Ensure the client connection is properly closed
        await client.end();
    }
};
