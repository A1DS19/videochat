import React from 'react';
import type { NextPage } from 'next';
import { Container } from '@chakra-ui/react';

interface ContainerProps {}

export const Layout: NextPage<ContainerProps> = ({ children }): JSX.Element => {
  return (
    <React.Fragment>
      <Container maxW={'container.lg'} padding={5}>
        {children}
      </Container>
    </React.Fragment>
  );
};
