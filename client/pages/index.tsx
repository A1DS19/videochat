import type { GetServerSidePropsResult, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import {
  useQuery,
  QueryClient,
  DehydratedState,
  dehydrate,
  UseQueryResult,
} from 'react-query';
import { Error, Room } from '../shared/context/rooms/types';
import * as api from '../shared/context/rooms/rooms';
import { Box } from '@chakra-ui/react';
import { RoomIndex } from '../components/rooms/RoomIndex';
import { RoomsContext } from '../shared/context/rooms/RoomsProvider';

const Home: NextPage = () => {
  const { addRooms } = React.useContext(RoomsContext);
  const { data, isError, error }: UseQueryResult<Room[], Error> = useQuery<Room[], Error>(
    'rooms/all_rooms',
    api.getAllRooms
  );

  React.useEffect(() => {
    addRooms(data as Room[]);
  }, [data, addRooms]);

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

export const getServerSideProps = async (): Promise<
  GetServerSidePropsResult<{ dehydratedState: DehydratedState }>
> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('rooms/all_rooms', api.getAllRooms);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
