import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoreRepository } from './store.repository';

@Injectable()
export class StoreService {
    constructor(private readonly storeRepository: StoreRepository) {
    }

    async create(createStoreDto: CreateStoreDto) {
        const store = await this.storeRepository.create(createStoreDto);

        return await this.storeRepository.save(store);
    }

    async findAll() {
        return this.storeRepository.find();
    }

    async findOne(id: number) {
        const store = await this.storeRepository.findById(id);
        if (!store) {
            throw new HttpException(`Store with ${id} not found.`, HttpStatus.NOT_FOUND);
        }

        return store;
    }

    async update(id: number, updateStoreDto: UpdateStoreDto) {
        const store = await this.storeRepository.findById(id);
        if (!store) {
            throw new HttpException(`Store with ${id} not found.`, HttpStatus.NOT_FOUND);
        }

        Object.assign(store, updateStoreDto);

        return await this.storeRepository.save(store);
    }

    async remove(id: number) {
        const store = await this.storeRepository.findById(id);
        if (!store) {
            throw new HttpException(`Store with ${id} not found.`, HttpStatus.NOT_FOUND);
        }

        return this.storeRepository.remove(store);
    }
}
