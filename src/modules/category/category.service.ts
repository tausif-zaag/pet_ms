import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './category.repository';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {
    }

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const { name } = createCategoryDto;

        // Check if the category with the same name already exists
        const isDuplicate = await this.categoryRepository.checkDuplicate(name);

        if (isDuplicate) {
            throw new ConflictException(`Category with name "${name}" already exists.`);
        }

        // If not a duplicate, create and save the new category
        const category = this.categoryRepository.create(createCategoryDto);

        return this.categoryRepository.save(category);
    }

    findAll() {
        return this.categoryRepository.find();
    }

    async findOne(id: number): Promise<Category> {
        const category = await this.categoryRepository.findById(id);

        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        return category;
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        const { name } = updateCategoryDto;

        // Find the existing category to update
        const existingCategory = await this.categoryRepository.findById(id);
        if (!existingCategory) {
            throw new Error(`Category with ID ${id} not found.`);
        }

        // Check if the category with the same name already exists, excluding the current category
        const isDuplicate = await this.categoryRepository.checkDuplicateForUpdate(name, id);
        if (isDuplicate) {
            throw new ConflictException(`Category with name "${name}" already exists.`);
        }

        // Update the category fields
        Object.assign(existingCategory, updateCategoryDto);

        // Save and return the updated category
        return this.categoryRepository.save(existingCategory);
    }

    // Remove a category by ID
    async remove(id: number): Promise<string> {
        const category = await this.findOne(id);

        // Remove the category
        await this.categoryRepository.remove(category);

        return `Category with ID ${id} has been successfully deleted`;
    }
}
