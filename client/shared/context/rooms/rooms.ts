import { api } from '../../requests/axios';
import { Room, RoomChat, RoomTokenDto, RoomTokenRes } from './types';

export const getAllRooms = async (): Promise<Room[]> => {
  const { data } = await api.get('/rooms/');
  return data;
};

export const getRoomToken = async (dto: RoomTokenDto): Promise<RoomTokenRes> => {
  const { data } = await api.get(`/rooms/token?roomName=${dto.roomName}&uid=${dto.uid}`);
  return data;
};

export const getCurrentRoom = async (
  roomName: string
): Promise<Room & { messages: RoomChat[] }> => {
  const { data } = await api.post(`/rooms/room/${roomName}`);
  return data;
};

export const createRoom = async (roomName: string): Promise<Room> => {
  const { data } = await api.post(`/rooms/create`, { roomName });
  return data;
};

export const getMyRooms = async (id: number): Promise<Room[]> => {
  const { data } = await api.get(`/rooms/${id}`);
  return data;
};
