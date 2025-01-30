import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Admin extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 1 })
  status: number;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);