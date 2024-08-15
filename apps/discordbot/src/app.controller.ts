import { Controller } from '@nestjs/common';
import { On } from '@discord-nestjs/core';
import { Message } from 'discord.js';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @On('messageCreate')
  async onMessage(message: Message): Promise<void> {
  }
}
