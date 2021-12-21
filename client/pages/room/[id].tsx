import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import dynamic from 'next/dynamic';

const DynamicVideoCall = dynamic(() => import('../../components/video/VideoCall'), {
  ssr: false,
});

const RoomPage = (): JSX.Element => {
  const router = useRouter();
  const [inCall, setInCall] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <Button onClick={() => setInCall(true)}>JOIN</Button>
      {inCall && <DynamicVideoCall setInCall={setInCall} />}
    </React.Fragment>
  );
};

export default RoomPage;
