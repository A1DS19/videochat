import { IsNumber, IsString, Min } from 'class-validator';

export class CreateRoomDto {
  @IsString({ message: 'The room name is required' })
  roomName: string;

  @IsNumber()
  @Min(1)
  uid: string;
}
