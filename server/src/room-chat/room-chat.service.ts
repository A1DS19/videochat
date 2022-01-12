import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { RoomChat } from './room-chat.entity';
import { MessagePayload } from './types/room-chat.types';

@Injectable()
export class RoomChatService {
  constructor(
    @InjectRepository(RoomChat)
    private roomChatRepository: Repository<RoomChat>,
  ) {}

  private logger: Logger = new Logger('RoomChatServiceLogger');

  async create_message(payload: MessagePayload): Promise<RoomChat> {
    const message = this.roomChatRepository.create({
      roomId: payload.room_id,
      userId: payload.user_id,
      message: payload.message,
    });

    await this.roomChatRepository.save(message);

    if (!message) throw new WsException('Message could not be sent');

    const newMessage = await this.roomChatRepository.findOne({
      where: { id: message.id },
      relations: ['user', 'room'],
    });

    return newMessage;
  }

  async get_all_messages(room_id: number): Promise<Array<RoomChat>> {
    const messages = await this.roomChatRepository.find({
      where: { roomId: room_id },
      relations: ['user', 'room'],
    });

    if (!messages) throw new NotFoundException('No messages in current room');

    return messages;
  }
}
