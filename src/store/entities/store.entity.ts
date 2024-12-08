import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
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

    @ManyToMany(() => Stuff, (stuff) => stuff.store)
    stuffs: Stuff[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
