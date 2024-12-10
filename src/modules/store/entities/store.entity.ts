import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Pet } from '../../pet/entities/pet.entity';
import { Stuff } from '../../stuff/entities/stuff.entity';

@Entity('store')
export class Store {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @ManyToOne(() => Pet, (pet) => pet.store)
    pets: Pet[];

    @OneToMany(() => Stuff, (stuff) => stuff.store)
    stuffs: Stuff[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
