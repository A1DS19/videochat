import { Body, Controller, Post } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-channel.dto';
import { CreateRoom } from './types/controller-response-types';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Post('/create')
  async createRoom(@Body() data: CreateRoomDto): Promise<CreateRoom> {
    return this.roomsService.createRoom(data);
  }
}
