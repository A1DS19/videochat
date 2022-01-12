import { User } from '../users/types';

export type Room = {
  id: number;
  name: string;
  created_at: Date;
  creator: Creator;
};

export type Creator = {
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

export type RoomChat = {
  id: number;
  message: string;
  user: User;
  room: Room;
};

export type RoomsContextState = {
  rooms: Room[];
  addRoom: (room: Room) => void;
  addRooms: (rooms: Room[]) => void;
  currentRoom: Room | null;
  setCurrentRoom: (room: Room) => void;
  currentRoomChat: RoomChat[];
  setCurrentRoomChat: (message: RoomChat) => void;
};
