import { Grid } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { Video } from '../../components/video/Video';
import { disconnect, join_room } from '../../util/video';

const RoomPage = (): JSX.Element => {
  const router = useRouter();
  const roomId = router.query.id as string;

  React.useEffect(() => {
    join_room(roomId, '2');

    // return () => {
    //   disconnect();
    // };
  }, [roomId]);

  return (
    <React.Fragment>
      <Grid padding={5} templateColumns='repeat(5, 1fr)' gap={2}>
        <Video />
      </Grid>
    </React.Fragment>
  );
};

export default RoomPage;
