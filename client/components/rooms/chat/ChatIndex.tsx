import React from 'react';
import type { NextPage } from 'next';
import { RoomsContext } from '../../../shared/context/rooms/RoomsProvider';
import { getCurrentRoom } from '../../../shared/context/rooms/rooms';
import { ChatList } from './ChatList';
import { get_all_messages_for_chat, join_room } from '../../../shared/context/rooms/chat';

interface ChatIndexProps {
  roomName: string;
}

export const ChatIndex: NextPage<ChatIndexProps> = ({ roomName }): JSX.Element => {
  const { setCurrentRoom, currentRoom, setCurrentRoomChat } =
    React.useContext(RoomsContext);

  React.useEffect(() => {
    (async () => {
      const room = await getCurrentRoom(roomName);
      setCurrentRoom(room);
      join_room(roomName);
    })();
  }, []);

  return <React.Fragment>{currentRoom && <ChatList />}</React.Fragment>;
};
