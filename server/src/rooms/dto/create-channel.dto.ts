import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString({ message: 'The room name is required' })
  roomName: string;
}
