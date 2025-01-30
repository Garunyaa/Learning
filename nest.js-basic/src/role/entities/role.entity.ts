import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Role extends Document {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ default: 1 })
    status: number;

    @Prop({ default: Date.now })
    created_at: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);