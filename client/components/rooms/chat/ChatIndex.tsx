import React from 'react';
import type { NextPage } from 'next';
import { RoomsContext } from '../../../shared/context/rooms/RoomsProvider';
import { getCurrentRoom } from '../../../shared/context/rooms/rooms';
import { ChatForm } from './ChatForm';
import { socket } from '../../../shared/context/rooms/chat';
import { UsersContext } from '../../../shared/context/users/UsersProvider';
import { Message } from './Message';
import { Box } from '@chakra-ui/react';
import { useMutation } from 'react-query';
// @ts-ignore
import ScrollToBottom from 'react-scroll-to-bottom';

interface ChatIndexProps {
  roomName: string;
}

export const ChatIndex: NextPage<ChatIndexProps> = ({ roomName }): JSX.Element => {
  const { currentUser } = React.useContext(UsersContext);
  const { setCurrentRoom, currentRoom, currentRoomChat, setCurrentRoomChat } =
    React.useContext(RoomsContext);
  const { mutate: getRoomMutation, isLoading: isRoomLoading } = useMutation(
    getCurrentRoom,
    {
      onSuccess: async (room) => {
        setCurrentRoom(room);
        room.messages.forEach((message: any) => {
          setCurrentRoomChat(message);
        });
      },
    }
  );

  React.useEffect(() => {
    getRoomMutation(roomName);
  }, []);

  React.useEffect(() => {
    socket.on('msgToClient', (msg) => {
      setCurrentRoomChat(msg);
    });
  }, [currentRoomChat]);

  const renderChat = (): JSX.Element => {
    return (
      <ScrollToBottom className='chat'>
        {currentRoomChat.map((message) => (
          <Message key={message.id} currentUserUID={currentUser?.id!} message={message} />
        ))}
      </ScrollToBottom>
    );
  };

  if (isRoomLoading) {
    return <div>Loading</div>;
  }

  return (
    <React.Fragment>
      {currentRoom && (
        <React.Fragment>
          <Box bg={'gray.200'} borderRadius={'md'} my={3}>
            {renderChat()}
          </Box>
          <ChatForm />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
