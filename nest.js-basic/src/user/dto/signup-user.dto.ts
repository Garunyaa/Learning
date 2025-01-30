import { IsString,IsEmail, IsNotEmpty, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class SignupUserDto {
    @IsString({ message: 'Enter a valid name' })
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @IsMongoId({ message: 'Role must be a valid ObjectId' })
    @IsNotEmpty({ message: 'Role is required' })
    role: ObjectId;
}