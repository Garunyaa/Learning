import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginAdminDto {
    @IsEmail()
    email: string;

    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}