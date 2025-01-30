import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private readonly bookModel: Model<Book>) { }

  // Create a new book
  async createBook(bookData: CreateBookDto): Promise<Book> {
    const newBook = new this.bookModel(bookData);
    return newBook.save();
  }

  // Get all books
  async findAllBooks(): Promise<Book[]> {
    return this.bookModel.find().sort({ created_at: -1 }).exec();
  }  

  // Find a book by ID
  async findBookById(bookId: string): Promise<Book> {
    return this.bookModel.findById(bookId).exec();
  }

  // Update a book
  async updateBook(id: string, updateBookDto: UpdateBookDto) {
    return this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true });
  }

  // Delete a book
  deleteBook(id: string) {
    return this.bookModel.findByIdAndDelete(id);
  }
}
