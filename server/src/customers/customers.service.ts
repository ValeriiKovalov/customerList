import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDTO, FieldsForUpdate } from '../types/customer';
import { Customer, CustomerDocument } from '../schemas/customer.schema';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  async create(customerDTO: CreateCustomerDTO): Promise<Customer> {
    console.log('Add a new customer');
    return this.customerModel.create(customerDTO).catch((e) => {
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

  async findAll(): Promise<Customer[]> {
    console.log('Returns all customers');
    return this.customerModel
      .find()
      .populate('projects')
      .catch((e) => {
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

  async findOne(id: string): Promise<Customer> {
    console.log(`Returns a #${id} customer`);
    return this.customerModel.findById(id).catch((e) => {
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

  async updateFields(
    id: string,
    fieldsForUpdate: FieldsForUpdate,
  ): Promise<Customer> {
    console.log(`Update fields of a #${id} customer`);
    return this.customerModel
      .findByIdAndUpdate(id, fieldsForUpdate, {
        new: true,
      })
      .catch((e) => {
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

  async deleteOne(id: string): Promise<any> {
    console.log(`Delete customer #${id}`);
    // TODO: remove customers together with all projects
    return this.customerModel.findByIdAndDelete(id).catch((e) => {
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
