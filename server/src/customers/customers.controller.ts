import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import {
  CreateCustomerDTO,
  FieldsForUpdate,
  Customer,
} from '../types/customer';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Post()
  create(@Body() customerDTO: CreateCustomerDTO): Promise<Customer> {
    return this.customersService.create(customerDTO);
  }

  @Get()
  findAll(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Customer> {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  updateFields(
    @Param('id') id: string,
    @Body() fieldsForUpdate: FieldsForUpdate,
  ): Promise<Customer> {
    return this.customersService.updateFields(id, fieldsForUpdate);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): Promise<any> {
    return this.customersService.deleteOne(id);
  }
}
