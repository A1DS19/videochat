import React from 'react';
import type { NextPage } from 'next';
import { RoomList } from './RoomList';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { RoomsContext } from '../../shared/context/rooms/RoomsProvider';
import { CreateRoomForm } from './create-room/CreateRoomForm';

interface RoomIndexProps {}

export const RoomIndex: NextPage<RoomIndexProps> = (): JSX.Element => {
  const { rooms } = React.useContext(RoomsContext);

  return (
    <React.Fragment>
      <Heading textAlign={'center'} mb={5}>
        My rooms
      </Heading>
      <SimpleGrid columns={2} spacing={10}>
        <Box>
          <Heading size={'lg'}>Create room</Heading>
          <CreateRoomForm />
        </Box>
        <RoomList rooms={rooms} />
      </SimpleGrid>
    </React.Fragment>
  );
};
