import React from 'react';
import type { NextPage } from 'next';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react';
import { LoginForm } from './LoginForm';

interface LoginModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const LoginModal: NextPage<LoginModalProps> = ({
  isOpen,
  onClose,
}): JSX.Element => {
  return (
    <React.Fragment>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login to your account</ModalHeader>
          <ModalCloseButton />

          <LoginForm onClose={onClose} />
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};
