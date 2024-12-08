import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsPhoneNumber } from 'class-validator';
import { Pet } from '../../pet/entities/pet.entity';

@Entity('owner')
export class Owner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, nullable: false })
    first_name: string;

    @Column({ nullable: true, length: 255 })
    last_name: string;

    @Column({ nullable: true, length: 255 })
    address: string;

    @Column({ nullable: true, length: 50 })
    phone: string;

    @Column({ nullable: false, length: 100 })
    email: string;

    @Column({ nullable: false })
    password: string;
    
    @OneToMany(() => Pet, (pet) => pet.owner)
    pets: Pet[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
