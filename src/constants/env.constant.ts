import * as dotenv from 'dotenv';
import * as process from 'node:process';

// Load environment variables from the .env file
dotenv.config();

// Export the environment variables
export const envConfig = {
    SERVER_PORT: process.env.SERVER_PORT,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,

    /* ------SMTP --------- */
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_FROM_MAIL: process.env.SMTP_FROM_MAIL,
    SMTP_FROM_NAME: process.env.SMTP_FROM_NAME,
    ADMINS: process.env.ADMINS,

    /* ------AWS --------- */
    S3_PREFIX: process.env.S3_PREFIX,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    REGION: process.env.REGION,
    IMAGE_UPLOAD_ROOT_FOLDER: 'nest/',
};
