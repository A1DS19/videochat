import { IsNumber, IsString, Min } from 'class-validator';

export class CreateChannelDto {
  @IsString({ message: 'Channel name is required' })
  channelName: string;

  @IsNumber()
  @Min(1)
  uid: string;
}
