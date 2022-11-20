import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ versionKey: false })
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop()
  contact: string;

  @Prop()
  start_date: Date;

  @Prop()
  end_date: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
