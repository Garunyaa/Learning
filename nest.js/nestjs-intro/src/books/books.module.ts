import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from './books.service';
import { BookController } from './books.controller';
import { Book, BookSchema } from './entities/book.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])],
  controllers: [BookController],
  providers: [BookService],
})

export class BooksModule { }