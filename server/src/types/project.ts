class CreateProjectDTO {
  customerId: string;
  name: string;
  contact: string;
  start_date: Date;
  end_date: Date;
}

class Project {
  name: string;
  contact: string;
  start_date: Date;
  end_date: Date;
}

class FieldsForUpdate {
  name: string;
  contact: string;
  start_date: Date;
  end_date: Date;
}

export { CreateProjectDTO, Project, FieldsForUpdate };
