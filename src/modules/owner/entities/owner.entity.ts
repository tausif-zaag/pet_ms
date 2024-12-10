import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Pet } from '../../pet/entities/pet.entity';

@Entity('owner')
export class Owner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'first_name', length: 255, nullable: false })
    firstName: string;

    @Column({ name: 'last_name', nullable: true, length: 255 })
    lastName: string;

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
