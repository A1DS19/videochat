import { Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const AboutPage = (): JSX.Element => {
  return (
    <React.Fragment>
      <Text>Simple group chat app</Text>
      <Text>
        Created by{' '}
        <Link href={'https://github.com/A1DS19'}>
          <a className='link' target={'_blank'}>
            Jose Padilla
          </a>
        </Link>
        , {new Date().getFullYear()}
      </Text>
    </React.Fragment>
  );
};

export default AboutPage;
