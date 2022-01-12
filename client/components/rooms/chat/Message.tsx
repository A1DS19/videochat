import React from 'react';
import type { NextPage } from 'next';
import { RoomChat } from '../../../shared/context/rooms/types';

interface MessageProps {
  message: RoomChat;
  currentUserUID: number;
}

export const Message: NextPage<MessageProps> = ({}): JSX.Element => {
  return <React.Fragment></React.Fragment>;
};
