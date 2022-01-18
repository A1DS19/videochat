import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-channel.dto';
import { GetTokenRes } from './types/controller-response-types';
import { GetTokenDto } from './dto/get-token.dto';
import { Room } from './rooms.entity';
import { CurrentUserID } from 'src/auth/decorators/get-current-user-id.decorator';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Public()
  @Get('/token')
  async getToken(@Query() data: GetTokenDto): Promise<GetTokenRes> {
    return await this.roomsService.getTokenForRoom(data);
  }

  @Post('/create')
  async createRoom(
    @Body() data: CreateRoomDto,
    @CurrentUserID() uid: number,
  ): Promise<Room> {
    return await this.roomsService.createRoom(data, uid);
  }

  @Public()
  @Get('/')
  async getRooms(): Promise<Array<Room>> {
    return await this.roomsService.getAllRooms();
  }

  @Get('/:id')
  async getMyRooms(@Param('id') id: number): Promise<Room[]> {
    return await this.roomsService.getMyRooms(id);
  }

  @Public()
  @Post('/room/:roomName')
  async getRoomBYName(@Param('roomName') roomName: string): Promise<Room> {
    return await this.roomsService.getRoomByName(roomName);
  }
}
