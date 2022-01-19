import { Manager } from 'socket.io-client';
import { api } from '../../requests/axios';
import { User } from '../users/types';
import { Room } from './types';

const manager = new Manager(
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://videochat-serverv1.herokuapp.com'
);
export const socket = manager.socket('/room-chat');

export type Message = {
  room_id: number;
  user_id: number;
  message: string;
};

export type MessageResponse = {
  id: number;
  userId: number;
  user: User;
  roomId: number;
  room: Room;
  message: string;
};

export type JoinRoom = { roomName: string; user: User };
export type LeaveRoom = JoinRoom;

export const get_all_messages_for_chat = async (
  room_id: number
): Promise<MessageResponse[]> => {
  const { data } = await api.get(`/chat-room/${room_id}`);
  return data;
};

export const join_room = (payload: JoinRoom) => {
  socket.emit('joinRoom', payload);
};

export const leave_room = (payload: LeaveRoom) => {
  socket.emit('leaveRoom', payload);
  socket.close();
};

export const send_message = (message: Message) => {
  socket.emit('msgToServer', message);
};
