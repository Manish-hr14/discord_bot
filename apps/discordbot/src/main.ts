import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.NATS,
    options: {
      servers: ['nats://localhost:4222'],  // Replace with your actual NATS server address
    },
  }) 
 await app.startAllMicroservices()
  await app.listen(3000);

  console.log('Discord bot is running...');
}
bootstrap();
