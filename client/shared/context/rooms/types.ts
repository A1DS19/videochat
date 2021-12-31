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

export type RoomsContextState = {
  rooms: Room[];
  addRoom: (room: Room) => void;
  addRooms: (rooms: Room[]) => void;
};
