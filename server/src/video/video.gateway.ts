import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'video',
})
export class VideoGateway implements OnGatewayInit, OnGatewayDisconnect {
  private logger: Logger = new Logger('VideoGateway');

  afterInit(server: Server): void {
    this.logger.log('Video gateway initialized');
  }

  handleDisconnect(client: Socket): void {
    client.broadcast.emit('remove-user', client.id);
  }

  @SubscribeMessage('joinRoom')
  handleJoin(
    @MessageBody() data: { roomId: string; userId: string },
    @ConnectedSocket() client: Socket,
  ): void {
    client.join(data.roomId);
    client.to(data.roomId).emit('joinedRoom', data.userId);
  }
}
