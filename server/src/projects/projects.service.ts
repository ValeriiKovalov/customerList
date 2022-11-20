import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as _ from 'lodash';
import { CreateProjectDTO } from '../types/project';
import { Project, ProjectDocument } from '../schemas/project.schema';
import { Customer, CustomerDocument } from '../schemas/customer.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  async create(projectDTO: CreateProjectDTO): Promise<Project> {
    try {
      console.log('This action adds a new project');
      const customerId = _.get(projectDTO, 'customerId');
      const newProject = await this.projectModel.create(
        _.omit(projectDTO, 'customerId'),
      );
      await this.customerModel.findByIdAndUpdate(customerId, {
        $push: { projects: newProject._id },
      });

      return newProject;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: e.message || 'Some Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: e,
        },
      );
    }
  }

  async findAll(): Promise<Project[]> {
    console.log('Returns all projects');
    return this.projectModel.find().catch((e) => {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: e.message || 'Some Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: e,
        },
      );
    });
  }

  async deleteOne(id: string): Promise<Project> {
    console.log(`Delete project #${id}`);
    return this.projectModel.findByIdAndDelete(id).catch((e) => {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: e.message || 'Some Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: e,
        },
      );
    });
  }
}
