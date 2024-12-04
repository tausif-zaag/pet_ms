import { Injectable } from '@nestjs/common';
import { DataSource, Not, Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnerRepository extends Repository<Owner> {
    constructor(private dataSource: DataSource) {
        super(Owner, dataSource.createEntityManager());
    }

    // Find an owner by its ID
    async findById(id: number): Promise<Owner | null> {
        return await this.findOne({
            where: { id: id },
        });
    }

    // Check if an owner with the given title already exists (duplicate check)
    async checkDuplicate(email: string): Promise<boolean> {
        const owner = await this.findOne({
            where: { email },
        });
        return !!owner;
    }

    // Check if an owner with the given title already exists, excluding the owner with the provided ID
    async checkDuplicateForUpdate(email: string, ownerId: number): Promise<boolean> {
        const owner = await this.findOne({
            where: { email, id: Not(ownerId) },
        });
        return !!owner;
    }
}