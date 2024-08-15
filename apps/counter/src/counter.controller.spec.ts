import { Test, TestingModule } from '@nestjs/testing';
import { CounterController } from './counter.controller';
import { CounterService } from './counter.service';

describe('CounterController', () => {
  let counterController: CounterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CounterController],
      providers: [CounterService],
    }).compile();

    counterController = app.get<CounterController>(CounterController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(counterController.getHello()).toBe('Hello World!');
    });
  });
});
