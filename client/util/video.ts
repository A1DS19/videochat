import { manager } from './sockets';

const socket = manager.socket('/video');

export const join_room = (roomId: string, userId: string): void => {
  socket.emit('joinRoom', { roomId, userId });

  socket.on('joinedRoom', (userId: string) => {
    console.log('user joined room' + userId);
  });
};
