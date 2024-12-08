import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateStuffDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    first_name: string;

    @IsNumber()
    @IsOptional()
    age?: number;

    @IsNotEmpty()
    store_id: number;
}
