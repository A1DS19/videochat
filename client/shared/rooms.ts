import { api } from './axios';

export type Room = {
  id: number;
  name: string;
  created_at: Date;
  creator: Creator;
};

type Creator = {
  id: number;
  email: string;
  created_at: Date;
};

export type Error = {
  statusCode: number;
  message: string;
};

export type RoomTokenRes = {
  roomName: string;
  token: string;
  uid: number;
};

export type RoomTokenDto = {
  roomName: string;
  uid: number | null;
};

export const getAllRooms = async (): Promise<Room> => {
  const { data } = await api.get('/rooms/');

  return data;
};

export const getRoomToken = async (dto: RoomTokenDto): Promise<RoomTokenRes> => {
  const { data } = await api.get(`/rooms/token?roomName=${dto.roomName}&uid=${dto.uid}`);

  return data;
};
