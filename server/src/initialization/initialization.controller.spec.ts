import { Test, TestingModule } from '@nestjs/testing';
import { InitializationController } from './initialization.controller';

describe('InitializationController', () => {
  let controller: InitializationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InitializationController],
    }).compile();

    controller = module.get<InitializationController>(InitializationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
