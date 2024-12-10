import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Owner } from '../../owner/entities/owner.entity';
import { Store } from '../../store/entities/store.entity';

@Entity('pet')
export class Pet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ nullable: true })
    age: number;

    @Column({ nullable: true })
    breed: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    weight: number; // Pet's weight in kilograms

    @Column({ nullable: true })
    color: string;

    @Column({ nullable: true })
    is_adopted: boolean;

    @ManyToOne(() => Category, (category) => category.pets)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @ManyToOne(() => Owner, (owner) => owner.pets)
    @JoinColumn({ name: 'owner_id' })
    owner: Owner;

    @ManyToOne(() => Store, (store) => store.pets)
    @JoinColumn({ name: 'store_id' })
    store: Store;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
