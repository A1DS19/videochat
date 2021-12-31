import React from 'react';
import { Room, RoomsContextState } from './types';

const contextDefaultValues: RoomsContextState = {
  rooms: [],
  addRoom: () => {},
  addRooms: () => {},
};

export const RoomsContext = React.createContext<RoomsContextState>(contextDefaultValues);

export const RoomsProvider: React.FC = ({ children }): JSX.Element => {
  const [rooms, setRooms] = React.useState<Room[]>(contextDefaultValues.rooms);
  const addRooms = (rooms: Room[]) => setRooms(rooms);
  const addRoom = (room: Room) => setRooms((prevRoom) => [...prevRoom, room]);

  return (
    <RoomsContext.Provider
      value={{
        rooms,
        addRoom,
        addRooms,
      }}
    >
      {children}
    </RoomsContext.Provider>
  );
};
