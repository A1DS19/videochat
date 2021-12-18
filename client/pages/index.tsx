import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>VIDEO APP</title>
        <meta name='description' content='Join a room and chat' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <p>Rooms</p>
    </div>
  );
};

export default Home;
