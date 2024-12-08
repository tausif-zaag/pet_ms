import { IsString, IsOptional, IsInt, IsBoolean, IsNumber, IsNotEmpty, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePetDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    age?: number;

    @IsOptional()
    @IsString()
    breed?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    weight?: number;

    @IsOptional()
    @IsString()
    color?: string;

    @IsOptional()
    @IsBoolean()
    is_adopted?: boolean;

    @IsNotEmpty()
    category_id: number;

    owner_id: number;

    @IsNotEmpty()
    store_id: number;
}
