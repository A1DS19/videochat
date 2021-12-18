import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagesGateway } from './messages.gateway';

@Module({
  imports: [ConfigService],
  providers: [MessagesGateway],
  exports: [],
})
export class MessagesModule {}
