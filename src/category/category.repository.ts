import { DataSource, Not, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepository extends Repository<Category> {
    constructor(private dataSource: DataSource) {
        super(Category, dataSource.createEntityManager());
    }

    async findById(id: number) {
        return await this.findOne({
            where: { id: id },
        });
    }

    // Check if category with a given name already exists (duplicate check)
    async checkDuplicate(name: string): Promise<boolean> {
        const category = await this.findOne({
            where: { name },
        });

        return !!category;
    }

    // Check if category with the given name already exists, excluding the category with the provided ID
    async checkDuplicateForUpdate(name: string, categoryId: number): Promise<boolean> {
        const category = await this.findOne({
            where: { name, id: Not(categoryId) },
        });

        return !!category;
    }

}