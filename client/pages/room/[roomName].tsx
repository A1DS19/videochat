import { useRouter } from 'next/router';
import React from 'react';
import dynamic from 'next/dynamic';
import { getRoomToken } from '../../shared/context/rooms/rooms';
import { useMutation } from 'react-query';

const DynamicVideoCall = dynamic(() => import('../../components/video/VideoCall'), {
  ssr: false,
});

const RoomPage = (): JSX.Element => {
  const router = useRouter();
  const [inCall, setInCall] = React.useState<boolean>(false);
  const roomName = router.query.roomName as string;
  const [token, setToken] = React.useState<string | null>(null);
  const [uid, setUid] = React.useState<string | null>(null);

  const { isLoading, mutate } = useMutation(getRoomToken, {
    onSuccess: (data) => {
      setToken(data.token);
      setUid(data.uid.toString());
      setInCall(true);
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
      mutate({ roomName, uid: null });
    }

    getCredentials();
  }, [roomName, router, mutate]);

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <React.Fragment>
      <h1>Welcome to room {roomName}</h1>
      {inCall && (
        <DynamicVideoCall
          setInCall={setInCall}
          roomName={roomName && roomName}
          token={token! && token.replaceAll(' ', '+')}
          uid={uid! && uid}
        />
      )}
    </React.Fragment>
  );
};

export default RoomPage;
