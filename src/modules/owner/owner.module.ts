import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { OwnerRepository } from './owner.repository';
import { PetRepository } from '../pet/pet.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Owner])],
    controllers: [OwnerController],
    providers: [OwnerService, OwnerRepository, PetRepository],
})
export class OwnerModule {}
