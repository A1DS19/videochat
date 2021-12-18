import { manager } from './sockets';
const socket = manager.socket('/video');

export const join_room = (roomId: string, userId: string): void => {
  //envia datos a server
  socket.emit('joinRoom', { roomId, userId });

  //recive datos de server
  socket.on('joinRoom', (userId: string) => {
    console.log('user joined room' + userId);
  });
};

export const disconnect = (): void => {
  socket.on('disconnected', (id: string) => {
    console.log(`${id} disconnected`);
  });
};

export const me = () => {
  socket.on('me', (id: string) => {
    console.log(`id ${id}`);
  });
};
