import { Injectable } from '@nestjs/common';

@Injectable()
export class CounterService {
  private count = 0;

  incrementCount(): number {
    this.count++;
    console.log(`Counter incremented, new count is ${this.count}`);
    return this.count;
  }

  getCount(): number {
    console.log(`Returning current count: ${this.count}`);
    return this.count;
  }
}
