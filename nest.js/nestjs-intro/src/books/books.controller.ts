import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { Response } from 'express';
import { BookService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ResponseHandler } from 'src/utils/response.handler';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  // Create a new book
  @Post()
  async create(@Body() createBookDto: CreateBookDto, @Res() res: Response): Promise<any> {
    try {
      const book = await this.bookService.createBook(createBookDto);

      if (!book) {
        return ResponseHandler.errorResponse(res, {}, 'Book creation failed', 400);
      }
      return ResponseHandler.successResponse(res, book, 'Book created successfully', 200);
    } catch (error) {
      return ResponseHandler.errorResponse(res, error, error.message, 500);
    }
  }

  // Get all books
  @Get()
  async findAll(@Res() res: Response): Promise<any> {
    try {
      const books = await this.bookService.findAllBooks();

      if (!books) {
        return ResponseHandler.successResponse(res, {}, 'No books found', 200);
      }
      return ResponseHandler.successResponse(res, books, 'Books fetched successfully', 200);
    } catch (error) {
      return ResponseHandler.errorResponse(res, error, error.message, 500);
    }
  }

  // Get a book by ID
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<any> {
    try {
      const book = await this.bookService.findBookById(id);

      if (!book) {
        return ResponseHandler.errorResponse(res, {}, 'Book not found', 404);
      }
      return ResponseHandler.successResponse(res, book, 'Book details retrieved successfully', 200);
    } catch (error) {
      return ResponseHandler.errorResponse(res, error, error.message, 500);
    }
  }

  // Update book details
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto, @Res() res: Response): Promise<any> {
    try {
      const book = await this.bookService.updateBook(id, updateBookDto);

      if (!book) {
        return ResponseHandler.errorResponse(res, {}, 'Book not found', 404);
      }
      return ResponseHandler.successResponse(res, book, 'Book updated successfully', 200);
    } catch (error) {
      return ResponseHandler.errorResponse(res, error, error.message, 500);
    }
  }

  // Delete a book
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<any> {
    try {
      const book = await this.bookService.deleteBook(id);

      if (!book) {
        return ResponseHandler.errorResponse(res, {}, 'Book not found', 404);
      }
      return ResponseHandler.successResponse(res, {}, 'Book deleted successfully', 200);
    } catch (error) {
      return ResponseHandler.errorResponse(res, error, error.message, 500);
    }
  }
}