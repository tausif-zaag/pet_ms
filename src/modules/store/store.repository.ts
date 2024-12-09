import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Store } from './entities/store.entity';

@Injectable()
export class StoreRepository extends Repository<Store> {
    constructor(private dataSource: DataSource) {
        super(Store, dataSource.createEntityManager());
    }

    // Find store by its ID
    async findById(id: number): Promise<Store | null> {
        return await this.findOne({
            where: { id: id },
        });
    }

}