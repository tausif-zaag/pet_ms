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

    // Check if an owner with the given email already exists (duplicate check)
    async checkDuplicate(email: string): Promise<boolean> {
        const owner = await this.findOne({ where: { email } });

        return !!owner;
    }

    // Check if an owner with the given email already exists, excluding the provided owner ID
    async checkDuplicateForUpdate(email: string, ownerId: number): Promise<boolean> {
        return await this.isEmailDuplicate(email, ownerId);
    }

    // Helper method to check duplicate email
    private async isEmailDuplicate(email: string, ownerId?: number): Promise<boolean> {
        const owner = await this.findOne({
            where: ownerId ? { email, id: Not(ownerId) } : { email },
        });
        return !!owner;
    }
}