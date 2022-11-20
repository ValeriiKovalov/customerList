import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Project } from './project.schema';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({ versionKey: false })
export class Customer {
  @Prop()
  isActive: boolean;

  @Prop({ required: true, unique: true })
  company: string;

  @Prop()
  industry: string;

  @Prop()
  about: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Project' }] })
  projects: Project[];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
