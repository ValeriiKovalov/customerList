import { Controller, Get } from '@nestjs/common';
import { InitializationService } from './initialization.service';

@Controller('initialization')
export class InitializationController {
  constructor(private initializationService: InitializationService) {}

  @Get()
  init(): Promise<string> {
    return this.initializationService.init();
  }
}
