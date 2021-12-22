import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RtcRole, RtcTokenBuilder } from 'agora-access-token';
import { ENV_CONFIGURATION } from 'config/configuration';
import { CreateChannelDto } from './dto/create-channel.dto';

@Injectable()
export class ChannelsService {
  constructor(private configService: ConfigService<ENV_CONFIGURATION>) {}

  private createToken(data: CreateChannelDto): string {
    const appId = this.configService.get('AGORA_APP_ID');
    const appCertificate = this.configService.get('AGORA_APP_CERTIFICATE');
    const channelName = data.channelName;
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
}
