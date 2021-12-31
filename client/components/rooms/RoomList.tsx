import React from 'react';
import type { NextPage } from 'next';
import { Room as RoomType } from '../../shared/context/rooms/types';
import { Room } from './Room';
import { Box } from '@chakra-ui/react';

interface RoomListProps {
  rooms: RoomType[];
}

export const RoomList: NextPage<RoomListProps> = ({ rooms }): JSX.Element => {
  const renderRooms = (): JSX.Element[] => {
    return (
      rooms &&
      rooms.map((room) => {
        return <Room key={room.id} room={room} />;
      })
    );
  };

  return (
    <React.Fragment>
      <Box my={5}>{renderRooms()}</Box>
    </React.Fragment>
  );
};
