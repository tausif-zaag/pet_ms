import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { PetRepository } from './pet.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Owner } from '../owner/entities/owner.entity';
import { Category } from '../category/entities/category.entity';
import { Store } from '../store/entities/store.entity';
import { CategoryService } from '../category/category.service';
import { StoreService } from '../store/store.service';
import { OwnerService } from '../owner/owner.service';
import { CategoryRepository } from '../category/category.repository';
import { StoreRepository } from '../store/store.repository';
import { OwnerRepository } from '../owner/owner.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Pet, Owner, Category, Store])],
    providers: [
        PetService,
        PetRepository,
        CategoryService,
        StoreService,
        OwnerService,
        CategoryRepository,
        StoreRepository,
        OwnerRepository,
    ],
    controllers: [PetController],
})
export class PetModule {
}
