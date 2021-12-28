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
import * as api from '../shared/rooms';
import Link from 'next/link';

const Home: NextPage = () => {
  const { data, isError, error }: UseQueryResult<api.Room, api.Error> = useQuery<
    api.Room,
    api.Error
  >('rooms/all_rooms', api.getAllRooms);

  console.log(data);

  return (
    <div>
      <Head>
        <title>VIDEO CHAT APP</title>
        <meta name='description' content='Join a room and chat' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1>View all streams</h1>
    </div>
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
