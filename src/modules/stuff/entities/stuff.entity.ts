import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { Store } from '../../store/entities/store.entity';

@Entity('stuff')
export class Stuff {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'first_name' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    firstName: string;

    @Column()
    @IsNumber()
    @IsOptional()
    age?: number;

    @ManyToOne(() => Store, (store) => store.stuffs)
    @JoinColumn({ name: 'stuff_id' })
    store: Store;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
