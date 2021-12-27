import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetTokenDto {
  @IsNotEmpty()
  @IsString({ message: 'The room name is required' })
  roomName: string;

  @IsOptional()
  uid: string;
}
