import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InitializationController } from './initialization.controller';
import { InitializationService } from './initialization.service';
import { Project, ProjectSchema } from '../schemas/project.schema';
import { Customer, CustomerSchema } from '../schemas/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [InitializationController],
  providers: [InitializationService],
})
export class InitializationModule {}
