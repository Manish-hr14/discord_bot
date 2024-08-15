import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { GatewayIntentBits } from 'discord.js';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BotGateway } from './bot.gateway';

@Module({
  imports: [
    DiscordModule.forRootAsync({
      useFactory: () => ({
        token: 'dummy',
        discordClientOptions: {
          intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
        },
      }),
    }),
    ClientsModule.register([
      {
        name: 'COUNTER_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService,BotGateway],
})
export class AppModule {}
