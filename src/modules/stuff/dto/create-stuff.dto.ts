import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateStuffDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    firstName: string;

    @IsNumber()
    @IsOptional()
    age?: number;

    @IsNotEmpty()
    store_id: number;
}
