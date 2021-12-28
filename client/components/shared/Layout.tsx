import React from 'react';
import type { NextPage } from 'next';
import { Container } from '@chakra-ui/react';
import { Navbar } from '../nav/Navbar';

interface ContainerProps {}

export const Layout: NextPage<ContainerProps> = ({ children }): JSX.Element => {
  return (
    <React.Fragment>
      <Navbar />
      <Container maxW={'container.lg'} padding={5}>
        {children}
      </Container>
    </React.Fragment>
  );
};
