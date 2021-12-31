import React from 'react';
import type { NextPage } from 'next';
import { Alert, AlertIcon, Box } from '@chakra-ui/react';

interface CostumAlertProps {
  type: 'error' | 'success' | 'warning' | 'info';
  msg: string;
}

export const CostumAlert: NextPage<CostumAlertProps> = ({ type, msg }): JSX.Element => {
  return (
    <React.Fragment>
      <Box mb={3}>
        <Alert status={type} rounded={'lg'} maxW={'80%'} margin={'auto'}>
          <AlertIcon />
          {msg}
        </Alert>
      </Box>
    </React.Fragment>
  );
};
