import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageToRoomDto } from './dto/message-to-room.dto';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  namespace: 'messages',
})
export class MessagesGateway implements OnGatewayInit {
  private logger: Logger = new Logger('Messages gateway initialiazed');
  //Enviar mensaje a toda la app
  @WebSocketServer() wss: Server;

  afterInit(server: Server) {
    this.logger.log('Messages Gateway Initialized');
  }

  @SubscribeMessage('messageToServer')
  handleMessage(client: Socket, data: MessageToRoomDto): void {
    client.emit('messageToClient', data);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string): void {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string): void {
    client.leave(room);
    client.emit('leftRoom', room);
  }
}
