import { Project } from './project';

class CreateCustomerDTO {
  isActive: boolean;
  company: string;
  industry: string;
  about: string;
}

class Customer {
  isActive: boolean;
  company: string;
  industry: string;
  about: string;
  projects: Project[];
}

class FieldsForUpdate {
  isActive: boolean;
  company: string;
  industry: string;
  about: string;
}

export { CreateCustomerDTO, Customer, FieldsForUpdate };
