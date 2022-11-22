import { Controller, Post } from '@nestjs/common';
import { InitializationService } from './initialization.service';

@Controller('initialization')
export class InitializationController {
  constructor(private initializationService: InitializationService) {}

  @Post()
  init(): Promise<string> {
    return this.initializationService.init();
  }
}
