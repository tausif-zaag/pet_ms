import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetRepository } from './pet.repository';
import { CategoryService } from '../category/category.service';
import { OwnerService } from '../owner/owner.service';
import { StoreService } from '../store/store.service';

@Injectable()
export class PetService {
    constructor(
        private readonly petRepository: PetRepository,
        private readonly categoryService: CategoryService,
        private readonly ownerService: OwnerService,
        private readonly storeService: StoreService,
    ) {
    }

    async create(createPetDto: CreatePetDto) {
        let owner = null;

        const category = await this.categoryService.findOne(createPetDto.category_id);

        if (!category) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }

        if (createPetDto.owner_id) {
            owner = await this.ownerService.findOne(createPetDto.owner_id);
            if (!owner) {
                throw new HttpException('Owner not found', HttpStatus.NOT_FOUND);
            }
        }

        const store = await this.storeService.findOne(createPetDto.store_id);

        if (!store) {
            throw new HttpException('Store not found', HttpStatus.NOT_FOUND);
        }

        const pet = this.petRepository.create({
            name: createPetDto.name,
            age: createPetDto.age,
            breed: createPetDto.breed,
            description: createPetDto.description,
            weight: createPetDto.weight,
            color: createPetDto.color,
            is_adopted: createPetDto.is_adopted,
            category,
            owner,
            store,
        });

        return await this.petRepository.save(pet);
    }

    findAll(category_id?: number, page: number = 1, limit: number = 10, isAdopted: boolean = false) {
        return this.petRepository.findAll(category_id, page, limit, isAdopted);
    }

    async findOne(id: number) {
        const pet = await this.petRepository.findById(id);

        if (!pet) {
            throw new HttpException(`Pet with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        return pet;
    }

    async update(id: number, updatePetDto: UpdatePetDto) {
        const pet = await this.petRepository.findById(id);

        if (!pet) {
            throw new HttpException(`Pet with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        Object.assign(pet, updatePetDto);

        return await this.petRepository.save(pet);
    }


    async remove(id: number) {
        const pet = await this.petRepository.findById(id);

        if (!pet) {
            throw new HttpException(`Pet with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        return this.petRepository.remove(pet);
    }

    async adoptPet(petId: number, ownerId: number) {
        console.debug('petId, ownerId [adoptPet]:', petId, ownerId);

        const pet = await this.petRepository.findOne({ where: { id: petId } });
        if (!pet) {
            throw new HttpException(`Pet with ID ${petId} not found`, HttpStatus.NOT_FOUND);
        }

        const owner = await this.ownerService.findOne(ownerId);
        if (!owner) {
            throw new HttpException(`Owner with ID ${ownerId} not found`, HttpStatus.NOT_FOUND);
        }

        // Check if the pet is already adopted
        if (pet.is_adopted) {
            throw new HttpException('This pet has already been adopted', HttpStatus.BAD_REQUEST);
        }

        pet.owner = owner;
        pet.is_adopted = true;

        return await this.petRepository.save(pet);


    }
}
