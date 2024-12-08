import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStuffDto } from './dto/create-stuff.dto';
import { UpdateStuffDto } from './dto/update-stuff.dto';
import { StuffRepository } from './stuff.repository';
import { StoreService } from '../store/store.service';

@Injectable()
export class StuffService {
    constructor(private readonly stuffRepository: StuffRepository, private readonly storeService: StoreService) {
    }

    async create(createStuffDto: CreateStuffDto) {
        const store = await this.storeService.findOne(createStuffDto.store_id);
        if (!store) {
            throw new HttpException(`Store with ID ${createStuffDto.store_id} not found`, HttpStatus.NOT_FOUND);
        }

        const payload = {
            ...createStuffDto,
            store: store,
        };
        const stuff = await this.stuffRepository.create(payload);

        await this.stuffRepository.save(stuff);
    }

    findAll() {
        return this.stuffRepository.findAll();
    }

    async findOne(id: number) {
        const stuff = await this.stuffRepository.findById(id);
        if (!stuff) {
            throw new HttpException(`Stuff with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return stuff;
    }

    async update(id: number, updateStuffDto: UpdateStuffDto) {
        const stuff = await this.stuffRepository.findById(id);
        if (!stuff) {
            this.throwNotFound('Stuff', id);
        }

        if (updateStuffDto.store_id) {
            const store = await this.storeService.findOne(updateStuffDto.store_id);
            if (!store) {
                this.throwNotFound('Store', updateStuffDto.store_id);
            }
            stuff.store = store;
        }

        Object.assign(stuff, updateStuffDto);
        return await this.stuffRepository.save(stuff);
    }


    async remove(id: number) {
        const stuff = await this.stuffRepository.findById(id);
        if (!stuff) {
            this.throwNotFound('Stuff', id);
        }
        await this.stuffRepository.remove(stuff);
        return { message: `Stuff with ID ${id} removed successfully.` };
    }

    private throwNotFound(entity: string, id: number) {
        throw new HttpException(`${entity} with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
}
