import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('COUNTER_SERVICE') private readonly client: ClientProxy) {}

  async sendMessageToCounter(message: string): Promise<void> {
    this.client.emit('new-message', message);  // Send a message to the 'new-message' subject
  }

  async getCounter(): Promise<number> {
    return this.client.send<number>('get-count', {}).toPromise();  // Get the current count
  }
}
