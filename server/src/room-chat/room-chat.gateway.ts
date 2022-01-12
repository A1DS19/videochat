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
import { RoomChatService } from './room-chat.service';
import { MessagePayload } from './types/room-chat.types';

@WebSocketGateway({ namespace: 'room-chat', cors: true })
export class RoomChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private roomChatService: RoomChatService) {}
  private logger: Logger = new Logger();
  @WebSocketServer() wss: Server; //Envia mensaje a TODO el servidor

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
    console.log(payload);

    const message = await this.roomChatService.create_message(payload);
    this.wss.to(message.room.name).emit('msgToClient', message.message);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomName: string): void {
    client.join(roomName);
    client.emit('joinedRoom', roomName);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, roomName: string): void {
    client.leave(roomName);
    client.emit('leftRoom', roomName);
  }
}
