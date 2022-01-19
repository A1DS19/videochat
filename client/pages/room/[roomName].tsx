import { useRouter } from 'next/router';
import React from 'react';
import dynamic from 'next/dynamic';
import { getRoomToken } from '../../shared/context/rooms/rooms';
import { useMutation } from 'react-query';
import { UsersContext } from '../../shared/context/users/UsersProvider';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { socket, join_room } from '../../shared/context/rooms/chat';

const DynamicVideoCall = dynamic(() => import('../../components/video/VideoCall'), {
  ssr: false,
});

const DynamicJoinRoomModal = dynamic(
  () => import('../../components/video/JoinRoomModal'),
  {
    ssr: false,
  }
);

export type CallType = 'audio' | 'video' | 'audio_video';

const RoomPage = (): JSX.Element => {
  const toast = useToast();
  const router = useRouter();
  const [inCall, setInCall] = React.useState<boolean>(false);
  const roomName = router.query.roomName as string;
  const [token, setToken] = React.useState<string | null>(null);
  const [uid, setUid] = React.useState<number | null>(null);
  const { currentUser } = React.useContext(UsersContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [callType, setCallType] = React.useState<CallType | null>(null);
  const { isLoading: roomTokenLoading, mutate: mutateRoomToken } = useMutation(
    getRoomToken,
    {
      onSuccess: (data) => {
        setToken(data.token);
        setUid(data.uid);
        setInCall(true);
        onOpen();
      },
      onError: () => {
        router.push('/404');
      },
    }
  );

  const readyToLoad = inCall && token && roomName && callType && !roomTokenLoading;

  React.useEffect(() => {
    socket.on('joinedRoom', (res) => {
      toast({
        status: 'info',
        duration: 3000,
        isClosable: true,
        title: `User ${res} joined`,
      });
    });
  }, []);

  React.useEffect(() => {
    if (!roomName) {
      return;
    }

    async function getCredentials() {
      mutateRoomToken({ roomName, uid: currentUser?.id ? currentUser.id : null });
    }

    (async () => {
      await getCredentials();
    })();

    join_room({ roomName, user: currentUser! });

    window.onbeforeunload = function (e) {
      e.preventDefault();
      e.returnValue =
        'Are you sure you want to leave, you will be disconnected from the call';
    };
  }, [roomName]);

  if (roomTokenLoading) {
    return <></>;
  }

  return (
    <React.Fragment>
      <DynamicJoinRoomModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        setCallType={setCallType}
        roomName={roomName}
      />
      {readyToLoad && (
        <React.Fragment>
          <DynamicVideoCall
            setInCall={setInCall}
            roomName={roomName}
            token={token.replaceAll(' ', '+')}
            uid={currentUser?.id ? currentUser.id : (uid as number)}
            callType={callType}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default RoomPage;
