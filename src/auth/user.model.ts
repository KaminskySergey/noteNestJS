import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({ unique: true })
  email: string;

  @Prop()
  hashPassword: string;
}

export const AuthSchema = SchemaFactory.createForClass(User);
