import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetRepository extends Repository<Pet> {
    constructor(private dataSource: DataSource) {
        super(Pet, dataSource.createEntityManager());
    }

    async findById(id: number) {
        return await this.findOne({
            where: { id: id },
        });
    }

    async findAll() {
        return await this
            .createQueryBuilder('pet')
            .leftJoinAndSelect('pet.category', 'category')  // Join the category relation
            .leftJoinAndSelect('pet.owner', 'owner')        // Join the owner relation
            .leftJoinAndSelect('pet.store', 'store')        // Join the store relation
            .select([
                'pet.id',
                'pet.name',
                'pet.age',
                'pet.breed',
                'pet.description',
                'pet.weight',
                'pet.color',
                'pet.isAdopted',
                'category.id',   // Select only the id of the category
                'category.name', // Select only the name of the category
                'owner.id',      // Select only the id of the owner
                'owner.first_name', // Select only the first name of the owner
                'store.id',      // Select only the id of the store
                'store.name',    // Select only the name of the store
            ])
            .getMany();  // Executes the query and returns the results
    }

}