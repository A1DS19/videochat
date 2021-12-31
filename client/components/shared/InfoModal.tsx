import React from 'react';
import type { NextPage } from 'next';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface InfoModalProps {
  title?: string;
  message: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const InfoModal: NextPage<InfoModalProps> = ({
  isOpen,
  message,
  title = '',
  onClose,
}): JSX.Element => {
  const router = useRouter();

  return (
    <React.Fragment>
      <Modal
        closeOnEsc={false}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>{title}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{message}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => router.push('/')}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};
