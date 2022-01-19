import React from 'react';
import type { NextPage } from 'next';
//import { DarkModeSwitch } from './DarkModeSwitch';
import { Button, Flex, IconButton, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { UsersContext } from '../../shared/context/users/UsersProvider';
import { useMutation, useQuery } from 'react-query';
import { logout as logoutRequest } from '../../shared/requests/auth';
import { me } from '../../shared/context/users/users';
import { useRouter } from 'next/router';
import { User } from '../../shared/context/users/types';

interface NavbarProps {}
export type whichModal = 'login' | 'signup' | 'create-room';

export const Navbar: NextPage<NavbarProps> = ({}): JSX.Element => {
  const { isAuth, logout, addUser } = React.useContext(UsersContext);
  const [display, changeDisplay] = React.useState('none');
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const router = useRouter();
  const { data, isLoading } = useQuery<User, Error>('me', me, {
    onSuccess: (user) => {
      addUser(user);
    },
  });

  // const isUserLoggedIn = React.useCallback(async () => {
  //   const isUser = localStorage.getItem('access_token');
  //   if (isUser) {
  //     const data = await me();
  //     if (data) {
  //       addUser(data);
  //     }
  //   }
  // }, []);
  // React.useEffect(() => {}, [data]);

  const { mutate: logoutMutation } = useMutation(logoutRequest, {
    onSuccess: () => {
      logout();
      router.push('/auth?type=login');
    },
  });

  const handleModal = (type: whichModal): void => {
    switch (type) {
      case 'login':
        router.push('/auth?type=login');
        break;

      case 'signup':
        router.push('/auth?type=signup');
        break;
    }
  };

  const renderIsNotAuthLinks = (): JSX.Element => {
    return (
      <React.Fragment>
        <Button my={5} mx={1} onClick={() => handleModal('login')}>
          Login
        </Button>

        <Button my={5} mx={1} onClick={() => handleModal('signup')}>
          Signup
        </Button>
      </React.Fragment>
    );
  };

  const renderIsAuthLinks = (): JSX.Element => {
    return (
      <React.Fragment>
        <Button my={5} mx={1} onClick={async () => await logoutMutation()}>
          Logout
        </Button>
      </React.Fragment>
    );
  };

  const renderLinks = (): JSX.Element => {
    return (
      <React.Fragment>
        <Link href='/' passHref>
          <Button as='a' my={5} mx={1}>
            Home
          </Button>
        </Link>

        {!isAuth ? renderIsNotAuthLinks() : renderIsAuthLinks()}

        <Link href='/about' passHref>
          <Button as='a' my={5} mx={1}>
            About
          </Button>
        </Link>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Flex>
        <Flex align={'center'} marginLeft={'auto'} marginRight={0}>
          <Flex display={['none', 'none', 'flex', 'flex']}>{renderLinks()}</Flex>
          <IconButton
            aria-label='Open menu'
            size={'lg'}
            mr={2}
            icon={<HamburgerIcon />}
            display={['flex', 'flex', 'none', 'none']}
            onClick={() => changeDisplay('flex')}
            mt={2}
          />
          {/* <DarkModeSwitch isDark={isDark} toggleColorMode={toggleColorMode} /> */}
        </Flex>

        <Flex
          w={'100%'}
          bg={!isDark ? 'gray.50' : '#1a202c'}
          zIndex={20}
          h={'100vh'}
          pos={'fixed'}
          top={'0'}
          left={'0'}
          overflowY={'auto'}
          flexDir={'column'}
          display={display}
        >
          <Flex justify={'flex-end'}>
            <IconButton
              aria-label='Close Menu'
              mt={2}
              mr={2}
              size={'lg'}
              icon={<CloseIcon />}
              onClick={() => changeDisplay('none')}
            />
          </Flex>
          <Flex flexDirection={'column'} align={'center'}>
            {renderLinks()}
          </Flex>
        </Flex>
      </Flex>
    </React.Fragment>
  );
};
