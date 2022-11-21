import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from './customers/customer.module';
import { ProjectsModule } from './projects/project.module';
import { InitializationModule } from './initialization/initialization.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:27017/${process.env.MONGO_DATABASE}?authSource=${process.env.MONGO_USERNAME}`,
    ),
    CustomersModule,
    ProjectsModule,
    InitializationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
