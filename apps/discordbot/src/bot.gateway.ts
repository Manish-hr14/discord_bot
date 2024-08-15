import { Inject, Injectable, Logger } from '@nestjs/common';
import { On, Once, InjectDiscordClient } from '@discord-nestjs/core';
import { Client, Message } from 'discord.js';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);
  private clientProxy: ClientProxy;

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
    @Inject('COUNTER_SERVICE')  private natserver: ClientProxy,
  ) {
    
  }

  @Once('ready')
  onReady() {
    this.logger.log(`Bot ${this.client.user.tag} was started!`);
  }

  @On('messageCreate')
  async onMessage(message: Message): Promise<void> {
    if (!message.author.bot) {
      this.logger.log('Received a message, processing increment-count request...');
      
      try {
        const count = await this.natserver
          .send<number>({ cmd: 'increment-count' }, {})
          .toPromise();
        
        this.logger.log(`Received response from counter microservice: ${count}`);
        await message.reply(`I'm watching you. This is message number ${count}.`);
      } catch (error) {
        this.logger.error('Failed to process increment-count request', error);
        await message.reply('There was an error processing your request.');
      }
    }
  }
}
