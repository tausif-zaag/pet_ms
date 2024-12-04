import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { OwnerModule } from './owner/owner.module';
import { SupplierModule } from './supplier/supplier.module';
import { StoreModule } from './store/store.module';
import { StuffModule } from './stuff/stuff.module';
import { PetModule } from './pet/pet.module';
import { InventoryModule } from './inventory/inventory.module';
import { PurchaseModule } from './purchase/purchase.module';
import { databaseConfig } from './config/database.config';

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
    }),
        TypeOrmModule.forRoot(databaseConfig),
        CategoryModule, OwnerModule, SupplierModule, StoreModule, StuffModule, PetModule, InventoryModule, PurchaseModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
