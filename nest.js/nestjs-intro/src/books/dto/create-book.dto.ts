import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString({ message: 'Author must be a string' })
  @IsNotEmpty({ message: 'Author is required' })
  author: string;

  @IsString({ message: 'Published date must be a valid date' })
  @IsNotEmpty({ message: 'Published date is required' })
  published_date: String;

  @IsString({ message: 'Language must be a string' })
  @IsNotEmpty({ message: 'Language is required' })
  language: string;

  @IsNumber({}, { message: 'Price must be a valid number' })
  @IsNotEmpty({ message: 'Price is required' })
  price: number;
}