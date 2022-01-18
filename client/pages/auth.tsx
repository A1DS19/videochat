import { Box, Divider, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { LoginForm } from '../components/auth/login/LoginForm';
import { SignupForm } from '../components/auth/signup/SignupForm';

export type whichAuth = 'login' | 'signup';

const AuthPage = (): JSX.Element => {
  const router = useRouter();
  const { type } = router.query;
  const [authType, setAuthType] = React.useState<whichAuth>(type as whichAuth);

  React.useEffect(() => {
    setAuthType(type as whichAuth);
  }, [type]);

  return (
    <React.Fragment>
      <SimpleGrid columns={2} spacing={10}>
        <Box>
          <Heading mb={3}>
            {authType === 'login' ? 'Login to your account' : 'Create an account'}
          </Heading>

          <Box>
            {authType === 'login' ? (
              <LoginForm setAuthType={setAuthType} />
            ) : (
              <SignupForm setAuthType={setAuthType} />
            )}
          </Box>
        </Box>

        <Flex>
          <Divider orientation='vertical' />
          <Box ml={3}>
            <Image src={'/images/logo.gif'} width='500vh' height='500vh' />
          </Box>
        </Flex>
      </SimpleGrid>
    </React.Fragment>
  );
};

export default AuthPage;
