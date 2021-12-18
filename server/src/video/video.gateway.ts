import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'video',
  cors: {
    origin: '*',
  },
})
export class VideoGateway
  implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection
{
  private logger: Logger = new Logger('VideoGateway');

  afterInit(server: Server): void {
    this.logger.log('Video gateway initialized');
  }

  //Al momento de crear gateway se devuelve id al user
  handleConnection(client: Socket, ...args: any[]): void {
    client.emit('me', client.id);
  }

  //Al momento de usuario salir de llamada se devuelve el id del user
  handleDisconnect(client: Socket): void {
    client.broadcast.emit('disconnected', client.id);
  }

  @SubscribeMessage('joinRoom')
  handleJoin(
    @MessageBody() data: { roomId: string; userId: string },
    @ConnectedSocket() client: Socket,
  ): void {
    client.join(data.roomId);
    client.broadcast.to(data.roomId).emit('joinRoom', data.userId);
  }
}
