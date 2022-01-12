import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomChat } from './room-chat.entity';
import { RoomChatGateway } from './room-chat.gateway';
import { RoomChatService } from './room-chat.service';
import { RoomChatController } from './room-chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoomChat])],
  providers: [RoomChatGateway, RoomChatService],
  controllers: [RoomChatController],
})
export class RoomChatModule {}
