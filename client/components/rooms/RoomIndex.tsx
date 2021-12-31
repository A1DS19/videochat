import React from 'react';
import type { NextPage } from 'next';
import { RoomList } from './RoomList';
import { Heading } from '@chakra-ui/react';
import { RoomsContext } from '../../shared/context/rooms/RoomsProvider';

interface RoomIndexProps {}

export const RoomIndex: NextPage<RoomIndexProps> = (): JSX.Element => {
  const { rooms } = React.useContext(RoomsContext);

  return (
    <React.Fragment>
      <Heading size={'lg'}>Available Rooms</Heading>
      <RoomList rooms={rooms} />
    </React.Fragment>
  );
};
