import React from 'react';
import { Room, RoomChat, RoomsContextState } from './types';

const contextDefaultValues: RoomsContextState = {
  rooms: [],
  addRoom: () => {},
  addRooms: () => {},
  currentRoom: null,
  setCurrentRoom: () => {},
  currentRoomChat: [],
  setCurrentRoomChat: () => {},
};

export const RoomsContext = React.createContext<RoomsContextState>(contextDefaultValues);

export const RoomsProvider: React.FC = ({ children }): JSX.Element => {
  const [rooms, setRooms] = React.useState<Room[]>(contextDefaultValues.rooms);
  const [currentRoom, setCurrentRoom] = React.useState<Room | null>(
    contextDefaultValues.currentRoom
  );
  const [currentRoomChat, setCurrentRoomChat] = React.useState<Array<RoomChat>>([]);
  const addRooms = (rooms: Room[]) => setRooms(rooms);
  const addRoom = (room: Room) => setRooms((prevRoom) => [...prevRoom, room]);
  const setCurrRoom = (room: Room) => setCurrentRoom(room);
  const setCurrRoomChat = (message: RoomChat) =>
    setCurrentRoomChat((prevMessage) => {
      if (!prevMessage.includes(message)) {
        return [...prevMessage, message];
      }
      return prevMessage;
    });

  return (
    <RoomsContext.Provider
      value={{
        rooms,
        addRoom,
        addRooms,
        currentRoom,
        setCurrentRoom: setCurrRoom,
        currentRoomChat,
        setCurrentRoomChat: setCurrRoomChat,
      }}
    >
      {children}
    </RoomsContext.Provider>
  );
};
