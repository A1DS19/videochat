import React from 'react';
import type { NextPage } from 'next';
import { RoomChat } from '../../../shared/context/rooms/types';
import { Text } from '@chakra-ui/react';

interface MessageProps {
  message: RoomChat;
  currentUserUID: number;
}

export const Message: NextPage<MessageProps> = ({
  message,
  currentUserUID,
}): JSX.Element => {
  return (
    <React.Fragment>
      <Text mx={3} py={1} color={currentUserUID === message.user.id ? 'green' : 'black'}>
        {message.user.userName}: {message.message}
      </Text>
    </React.Fragment>
  );
};
