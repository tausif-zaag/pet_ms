import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/category/category.module';
import { OwnerModule } from './modules/owner/owner.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { StoreModule } from './modules/store/store.module';
import { StuffModule } from './modules/stuff/stuff.module';
import { PetModule } from './modules/pet/pet.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { databaseConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { CustomLoggerService } from './logging/logger.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(databaseConfig),
        CategoryModule,
        OwnerModule,
        SupplierModule,
        StoreModule,
        StuffModule,
        PetModule,
        InventoryModule,
        PurchaseModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService, CustomLoggerService],
})
export class AppModule {}
