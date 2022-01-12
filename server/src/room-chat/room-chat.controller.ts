import { Controller, Get, Param } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { RoomChat } from './room-chat.entity';
import { RoomChatService } from './room-chat.service';

@Controller('room-chat')
export class RoomChatController {
  constructor(private roomChatService: RoomChatService) {}

  @Public()
  @Get('/:room_id')
  async getAllMessages(
    @Param('room_id') room_id: number,
  ): Promise<Array<RoomChat>> {
    return await this.roomChatService.get_all_messages(room_id);
  }
}
