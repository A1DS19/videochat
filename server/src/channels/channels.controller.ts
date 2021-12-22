import { Body, Controller, Post } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';

@Controller('channels')
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  @Post('/create')
  async createChannel(@Body() data: CreateChannelDto): Promise<string> {
    return '';
  }
}
