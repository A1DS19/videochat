import React from 'react';
import type { NextPage } from 'next';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: NextPage<AuthModalProps> = ({ isOpen, onClose }): JSX.Element => {
  const router = useRouter();

  return (
    <React.Fragment>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>You must login first!</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Link href={'/auth?type=login'}>
              <a target={'_blank'}>
                <Button variant='solid'>Login</Button>
              </a>
            </Link>
            <Button colorScheme='blue' ml={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};
