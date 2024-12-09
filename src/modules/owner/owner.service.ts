import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { OwnerRepository } from './owner.repository';
import * as bcrypt from 'bcrypt';
import { Pet } from '../pet/entities/pet.entity';
import { PetRepository } from '../pet/pet.repository';

@Injectable()
export class OwnerService {
    constructor(private readonly ownerRepository: OwnerRepository, private readonly petRepository: PetRepository) {
    }

    async create(createOwnerDto: CreateOwnerDto) {
        // Check for duplicate email
        const existingOwner = await this.ownerRepository.checkDuplicate(createOwnerDto.email);

        if (existingOwner) {
            throw new HttpException('Email already exists', HttpStatus.CONFLICT);
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(createOwnerDto.password, 10);

        // Create new owner with hashed password
        const owner = this.ownerRepository.create({
            ...createOwnerDto,
            password: hashedPassword,
        });

        // Save the owner to the database
        return await this.ownerRepository.save(owner);
    }

    async findAll() {
        return this.ownerRepository.find();
    }

    async findOne(id: number) {
        const owner = await this.ownerRepository.findById(id);
        if (!owner) {
            throw new HttpException(`Owner with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return owner;
    }

    async update(id: number, updateOwnerDto: UpdateOwnerDto) {
        const owner = await this.ownerRepository.findById(id);
        if (!owner) {
            throw new HttpException(`Owner with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        // Check for duplicate email during update (if email changes)
        if (updateOwnerDto.email && updateOwnerDto.email !== owner.email) {
            const emailDuplicate = await this.ownerRepository.checkDuplicateForUpdate(updateOwnerDto.email, id);
            if (emailDuplicate) {
                throw new HttpException(`Owner with email ${updateOwnerDto.email} already exists`, HttpStatus.CONFLICT);
            }
        }

        // If password is provided, hash it
        if (updateOwnerDto.password) {
            updateOwnerDto.password = await bcrypt.hash(updateOwnerDto.password, 10);
        }

        // Update owner with the new values (excluding id)
        Object.assign(owner, updateOwnerDto);

        // Save the updated owner to the database
        return await this.ownerRepository.save(owner);
    }

    async remove(id: number) {
        const owner = await this.ownerRepository.findById(id);
        if (!owner) {
            throw new HttpException(`Owner with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        const queryRunner = this.ownerRepository.manager.connection.createQueryRunner();

        // Start a transaction
        await queryRunner.startTransaction();

        try {
            // // Set 'is_adopted' to false and unlink the owner_id for all pets
            // await queryRunner.manager
            //     .createQueryBuilder()
            //     .update(Pet)
            //     .set({ is_adopted: false, owner: null })
            //     .where('owner_id = :ownerId', { ownerId: id })
            //     .execute();
            //
            // // Remove the owner
            // await queryRunner.manager.remove(owner);
            //
            // // Commit the transaction
            // await queryRunner.commitTransaction();

            await this.ownerRepository.manager.transaction(async (transactionalManager) => {
                transactionalManager.createQueryBuilder().update(Pet);
            });
        } catch (error) {
            // Rollback the transaction in case of error
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            // Release the query runner
            await queryRunner.release();
        }
    }

}
