import { IsString, Min } from 'class-validator';

export class MessageToRoomDto {
  @IsString()
  room: string;

  @IsString()
  sender: string;

  @Min(1)
  message: string;
}
