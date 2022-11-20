import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDTO, Project } from '../types/project';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  create(@Body() projectDTO: CreateProjectDTO): Promise<Project> {
    return this.projectsService.create(projectDTO);
  }

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): Promise<Project> {
    return this.projectsService.deleteOne(id);
  }
}
