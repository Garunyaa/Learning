import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber } from 'class-validator';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
    @IsString({ message: 'Enter a valid title' })
    title?: string;

    @IsString({ message: 'Enter a valid author name' })
    author?: string;

    @IsString({ message: 'Enter a valid published date' })
    published_date?: string;

    @IsString({ message: 'Enter a valid language' })
    language?: string;

    @IsNumber({}, { message: 'Enter a valid price' })
    price?: number;
}