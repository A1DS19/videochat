import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import Link from 'next/link';

const Home: NextPage = () => {
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

export default Home;
