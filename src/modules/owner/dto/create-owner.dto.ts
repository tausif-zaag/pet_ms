import { IsEmail, IsOptional, IsString, Length, IsPhoneNumber } from 'class-validator';

export class CreateOwnerDto {
    @IsString()
    @Length(1, 255)
    first_name: string;

    @IsOptional()
    @IsString()
    @Length(1, 255)
    last_name?: string;

    @IsOptional()
    @IsString()
    @Length(1, 255)
    address?: string;

    @IsOptional()
    @IsPhoneNumber(null)
    phone?: string;

    @IsEmail()
    @Length(1, 50)
    email: string;

    @IsString()
    @Length(6, 50)
    password: string;
}
