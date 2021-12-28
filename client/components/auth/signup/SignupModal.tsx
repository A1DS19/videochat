import React from 'react';
import type { NextPage } from 'next';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { SignupForm } from './SignupForm';

interface SignupModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const SignupModal: NextPage<SignupModalProps> = ({
  isOpen,
  onClose,
}): JSX.Element => {
  return (
    <React.Fragment>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <SignupForm onClose={onClose} />
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};
