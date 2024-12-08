import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateStoreDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;
}
