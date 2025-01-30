import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ versionKey: false })
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ ref: 'Role', required: true })
    role: MongooseSchema.Types.ObjectId;

    @Prop({ default: 1 })
    status: number;

    @Prop({ default: Date.now })
    created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);