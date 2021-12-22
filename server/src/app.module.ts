import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';
import { ChannelsModule } from './channels/channels.module';

@Module({
  imports: [
    ChannelsModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
