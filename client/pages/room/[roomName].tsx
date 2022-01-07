import { useRouter } from 'next/router';
import React from 'react';
import dynamic from 'next/dynamic';
import { getRoomToken } from '../../shared/context/rooms/rooms';
import { useMutation } from 'react-query';
import { UsersContext } from '../../shared/context/users/UsersProvider';
import { JoinRoomModal } from '../../components/video/JoinRoomModal';
import { useDisclosure } from '@chakra-ui/react';

const DynamicVideoCall = dynamic(() => import('../../components/video/VideoCall'), {
  ssr: false,
});

export type CallType = 'audio' | 'video' | 'audio_video';

const RoomPage = (): JSX.Element => {
  const router = useRouter();
  const [inCall, setInCall] = React.useState<boolean>(false);
  const roomName = router.query.roomName as string;
  const [token, setToken] = React.useState<string | null>(null);
  const [uid, setUid] = React.useState<number | null>(null);
  const { currentUser } = React.useContext(UsersContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [callType, setCallType] = React.useState<CallType | null>(null);

  const { isLoading, mutate } = useMutation(getRoomToken, {
    onSuccess: (data) => {
      setToken(data.token);
      setUid(data.uid);
      setInCall(true);
      onOpen();
    },
    onError: () => {
      router.push('/404');
    },
  });

  React.useEffect(() => {
    if (!roomName) {
      return;
    }

    async function getCredentials() {
      mutate({ roomName, uid: currentUser?.id ? currentUser.id : null });
    }

    getCredentials();
  }, [roomName, router, mutate]);

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <React.Fragment>
      <h1>Welcome to room {roomName}</h1>
      <JoinRoomModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        setCallType={setCallType}
        roomName={roomName}
      />
      {inCall && token && roomName && callType && (
        <DynamicVideoCall
          setInCall={setInCall}
          roomName={roomName}
          token={token.replaceAll(' ', '+')}
          uid={currentUser?.id ? currentUser.id : (uid as number)}
          callType={callType}
        />
      )}
    </React.Fragment>
  );
};

export default RoomPage;
