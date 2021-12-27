import { useRouter } from 'next/router';
import React from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';

const DynamicVideoCall = dynamic(() => import('../../components/video/VideoCall'), {
  ssr: false,
});

const RoomPage = (): JSX.Element => {
  const router = useRouter();
  const [inCall, setInCall] = React.useState<boolean>(false);
  const roomName = router.query.roomName as string;
  const [token, setToken] = React.useState<string | null>(null);
  const [uid, setUid] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!roomName) {
      return;
    }

    async function getCredentials() {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `http://localhost:5000/rooms/token?roomName=${roomName}&uid=${Math.floor(
            Math.random() * 1000
          )}`
        );

        setToken(data.token);
        setUid(data.uid);

        setInCall(true);
      } catch (err) {
        console.log(err);
        router.push('/404');
      } finally {
        setLoading(false);
      }
    }

    getCredentials();
  }, [roomName]);

  if (loading) {
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
