import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CounterModule } from './counter.module';

async function bootstrap() {
  const app = await NestFactory.create(CounterModule);
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(CounterModule, {
  //   transport: Transport.NATS,
  //   options: {
  //     servers: ['nats://localhost:4222'],  // Replace with your actual NATS server address
  //   },
  // });
 app.connectMicroservice({
   transport: Transport.NATS,
   options: {
     servers: ['nats://localhost:4222'],  // Replace with your actual NATS server address
   },
 }) 
await app.startAllMicroservices()
  await app.listen(6000);
  console.log('Counter microservice is listening for NATS messages...');
}

bootstrap();
