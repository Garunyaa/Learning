import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    name: string;
}