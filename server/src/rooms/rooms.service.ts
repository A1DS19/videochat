import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { RtcRole, RtcTokenBuilder } from 'agora-access-token';
import { ENV_CONFIGURATION } from 'config/configuration';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-channel.dto';
import { Rooms } from './rooms.entity';
import { CreateRoom } from './types/controller-response-types';

@Injectable()
export class RoomsService {
  constructor(
    private configService: ConfigService<ENV_CONFIGURATION>,
    @InjectRepository(Rooms) private roomsRepository: Repository<Rooms>,
  ) {}

  private createToken(data: CreateRoomDto): string {
    const appId = this.configService.get('AGORA_APP_ID');
    const appCertificate = this.configService.get('AGORA_APP_CERTIFICATE');
    const channelName = data.roomName;
    const uid = parseInt(data.uid);
    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 432000;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    return RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpiredTs,
    );
  }

  createRoom(data: CreateRoomDto): CreateRoom {
    const token = this.createToken(data);

    return {
      roomName: data.roomName,
      token,
      uid: data.uid,
    };
  }
}
