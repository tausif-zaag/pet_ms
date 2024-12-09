import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Stuff } from './entities/stuff.entity';

@Injectable()
export class StuffRepository extends Repository<Stuff> {
    constructor(private dataSource: DataSource) {
        super(Stuff, dataSource.createEntityManager());
    }

    async findById(id: number) {
        return await this.findOne({
            where: { id: id },
            relations: ['store'],
        });
    }

    async findAll() {
        return await this
            .createQueryBuilder('stuff')
            .leftJoinAndSelect('stuff.store', 'store')
            .select([
                'stuff.id',
                'stuff.first_name',
                'stuff.age',
                'store.id',
                'store.name',
            ])
            .getMany();
    }

}