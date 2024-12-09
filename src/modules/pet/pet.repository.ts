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
            relations: ['owner'],
        });
    }

    async findAll(
        categoryId: number,
        page: number = 1,
        limit: number = 10,
        isAdopted: boolean = false,
    ): Promise<{ data: Pet[], totalCount: number, totalPages: number }> {
        const maxLimit = 100; // Maximum items per page
        limit = Math.min(Math.max(limit, 1), maxLimit);

        console.debug('IsAdopted [petRepository]:', isAdopted);

        const queryBuilder = this.createQueryBuilder('pet')
            .leftJoinAndSelect('pet.category', 'category')
            .leftJoinAndSelect('pet.owner', 'owner')
            .leftJoinAndSelect('pet.store', 'store')
            .select([
                'pet.id',
                'pet.name',
                'pet.age',
                'pet.breed',
                'pet.description',
                'pet.weight',
                'pet.color',
                'pet.is_adopted',
                'category.id',
                'category.name',
                'owner.id',
                'owner.first_name',
                'store.id',
                'store.name',
            ]);

        // Default filter for isAdopted is false, but this can be overridden by the provided isAdopted value
        queryBuilder.where('pet.is_adopted = :isAdopted', { isAdopted });

        if (categoryId) {
            queryBuilder.where('pet.category_id = :categoryId', { categoryId });
        }


        // Fetch the data and total count
        const [data, totalCount] = await queryBuilder
            .skip((page - 1) * limit) // Calculate the number of items to skip
            .take(limit)              // Limit the number of items per page
            .getManyAndCount();       // Get the data and total count

        // Calculate total pages based on totalCount and limit
        const totalPages = Math.ceil(totalCount / limit);

        return {
            data,
            totalCount,
            totalPages,
        };
    }

}