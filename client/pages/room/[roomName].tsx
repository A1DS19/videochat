import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import dynamic from 'next/dynamic';
import { AGORA_TOKEN } from '../../util/video';

const DynamicVideoCall = dynamic(() => import('../../components/video/VideoCall'), {
  ssr: false,
});

//Por alguna razon pasar variables de otros archivos activa ssr

const RoomPage = (): JSX.Element => {
  const router = useRouter();
  const roomName = router.query.roomName as string;
  const [inCall, setInCall] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <Button onClick={() => setInCall(true)}>JOIN</Button>
      {inCall && (
        <DynamicVideoCall setInCall={setInCall} roomName={roomName} token={'gfdsgfsd'} />
      )}
    </React.Fragment>
  );
};

export default RoomPage;
