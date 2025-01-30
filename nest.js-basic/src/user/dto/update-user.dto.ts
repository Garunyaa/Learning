import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { SignupUserDto } from './signup-user.dto';

export class UpdateUserDto extends PartialType(SignupUserDto) {
    @IsString({ message: 'Enter a valid name' })
    name?: string;
}