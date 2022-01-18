import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { User } from 'src/users/users.entity';
import { RoomChatService } from './room-chat.service';
import { MessagePayload } from './types/room-chat.types';

@WebSocketGateway({ namespace: 'room-chat', cors: true })
export class RoomChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private roomChatService: RoomChatService) {}
  private logger: Logger = new Logger();
  @WebSocketServer() wss: Server;

  afterInit() {
    this.logger.log(`"room-chat" gateway initialized`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`"room-chat" client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`"room-chat" client disconnected: ${client.id}`);
  }

  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, payload: MessagePayload): Promise<void> {
    const message = await this.roomChatService.create_message(payload);
    this.wss.in(message.room.url_name).emit('msgToClient', message);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    client: Socket,
    payload: { roomName: string; user: User | null },
  ): void {
    const res = payload.user ? payload.user.userName : '';
    client.join(payload.roomName);
    this.wss.to(payload.roomName).emit('joinedRoom', res);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    client: Socket,
    payload: { roomName: string; user: User | null },
  ): void {
    const res = payload.user ? payload.user.userName : '';
    client.leave(payload.roomName);
    this.wss.to(payload.roomName).emit('leftRoom', res);
  }
}
