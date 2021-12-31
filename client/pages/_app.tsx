import '../css/videos.css';
import '../css/global.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from '../components/shared/Layout';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import React from 'react';
import { RoomsProvider } from '../shared/context/rooms/RoomsProvider';
import { UsersProvider } from '../shared/context/users/UsersProvider';
import { setConfig } from 'cloudinary-build-url';

setConfig({
  cloudName: 'ai1ds',
});

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <UsersProvider>
          <RoomsProvider>
            <ChakraProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ChakraProvider>
          </RoomsProvider>
        </UsersProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
