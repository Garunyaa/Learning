import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Book extends Document {
    @Prop({ required: true, unique: true })
    title: string;

    @Prop({ required: true })
    author: string;

    @Prop({ required: true })
    published_date: String;

    @Prop({ required: true })
    language: string;

    @Prop({ required: true })
    price: number;

    @Prop({ default: Date.now })
    created_at: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);