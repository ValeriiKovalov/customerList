import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Customer, CustomerDocument } from '../schemas/customer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from '../schemas/project.schema';
import { Model } from 'mongoose';
import * as _ from 'lodash';
import { CustomersInit } from '../../assets/db/initial.data';

@Injectable()
export class InitializationService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  async init(): Promise<string> {
    try {
      console.log('Seed the Database.');
      const customersForSave = [];
      const foundCustomers = await this.customerModel.find();

      if (foundCustomers && foundCustomers.length > 0) {
        return 'Database already contain some data.';
      }

      for (const customer of CustomersInit) {
        if (customer.projects.length > 0) {
          const projectsForSave = _.map(customer.projects, (project) =>
            _.omit(project, 'id'),
          );

          const storesProjects = await this.projectModel.insertMany(
            projectsForSave,
          );

          const transformedCustomer = {
            ...customer,
            projects: _.map(storesProjects, (project) => _.get(project, '_id')),
          };

          customersForSave.push(_.omit(transformedCustomer, 'id'));
        } else {
          customersForSave.push(_.omit(customer, 'id'));
        }
      }

      if (customersForSave.length > 0) {
        await this.customerModel.insertMany(customersForSave);
      }

      return 'Database was successfully filed.';
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
}
