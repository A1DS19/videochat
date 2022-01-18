import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { Room } from '../shared/context/rooms/types';
import * as api from '../shared/context/rooms/rooms';
import { Box } from '@chakra-ui/react';
import { RoomIndex } from '../components/rooms/RoomIndex';
import { RoomsContext } from '../shared/context/rooms/RoomsProvider';
import { UsersContext } from '../shared/context/users/UsersProvider';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { addRooms } = React.useContext(RoomsContext);
  const { currentUser } = React.useContext(UsersContext);
  const [isLoading, setLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      router.push('/auth?type=login');
    }
  }, []);

  React.useEffect(() => {
    if (currentUser) {
      (async () => {
        setLoading(true);
        const data = await api.getMyRooms(currentUser?.id!);
        setLoading(false);
        addRooms(data as Room[]);
      })();
    }
  }, [currentUser]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <Box>
      <Head>
        <title>VIDEO CHAT APP</title>
        <meta name='description' content='Join a room and chat' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <RoomIndex />
    </Box>
  );
};

export default Home;
