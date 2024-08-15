import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CounterService } from './counter.service';

@Controller()
export class CounterController {
  constructor(private readonly counterService: CounterService) {}

  @MessagePattern({ cmd: 'increment-count' })
  handleIncrementCount(): number {
    console.log('Received increment-count request');
    const result = this.counterService.incrementCount();
    console.log(`Returning incremented count: ${result}`);
    return result;
  }
}
