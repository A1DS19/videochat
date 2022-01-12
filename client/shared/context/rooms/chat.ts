import React from 'react';
import { io } from 'socket.io-client';
import { api } from '../../requests/axios';
import { RoomsContext } from './RoomsProvider';
const socket = io('http://localhost:5000/room-chat');

const { setCurrentRoomChat } = React.useContext(RoomsContext);

export type Message = {
  room_id: number;
  user_id: number;
  message: string;
};

export const get_all_messages_for_chat = async (room_id: number) => {
  const { data } = await api.get(`/chat-room/${room_id}`);
  return data;
};

export const join_room = (roomName: string) => {
  socket.emit('joinRoom', roomName);
  socket.on('joinedRoom', (res) => {
    console.log('JOIN ROOM', res);
  });
};

export const leave_room = (roomName: string) => {
  socket.emit('leaveRoom', roomName);
  socket.on('leftRoom', (res) => {
    console.log('LEFT ROOM', res);
  });
};

export const send_message = (message: Message) => {
  socket.emit('msgToServer', message);
  socket.on('msgToClient', (msg) => {
    setCurrentRoomChat(msg);
  });
};
