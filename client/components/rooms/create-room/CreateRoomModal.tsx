import React from 'react';
import type { NextPage } from 'next';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react';
import { CreateRoomForm } from './CreateRoomForm';

interface CreateRoomModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const CreateRoomModal: NextPage<CreateRoomModalProps> = ({
  isOpen,
  onClose,
}): JSX.Element => {
  return (
    <React.Fragment>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new room</ModalHeader>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};
