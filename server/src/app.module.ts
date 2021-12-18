import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [MessagesModule, VideoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
