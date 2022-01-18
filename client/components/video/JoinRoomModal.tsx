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
  Flex,
} from '@chakra-ui/react';
import { CallType } from '../../pages/room/[roomName]';
import { getDevices } from 'agora-rtc-sdk';
import { useRouter } from 'next/router';

interface JoinRoomModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setCallType: React.Dispatch<React.SetStateAction<CallType | null>>;
  roomName: string;
}

const JoinRoomModal: NextPage<JoinRoomModalProps> = ({
  isOpen,
  onClose,
  setCallType,
  roomName,
}): JSX.Element => {
  const [audioDevices, setAudioDevices] = React.useState<
    AgoraRTC.MediaDeviceInfo[] | null
  >(null);
  const [videoDevices, setVideoDevices] = React.useState<
    AgoraRTC.MediaDeviceInfo[] | null
  >(null);
  const router = useRouter();

  React.useEffect(() => {
    getDevices((devices) => {
      const audioDevices = devices.filter(function (device) {
        return device.kind === 'audioinput';
      });
      const videoDevices = devices.filter(function (device) {
        return device.kind === 'videoinput';
      });

      setAudioDevices(audioDevices.length > 0 ? audioDevices : null);
      setVideoDevices(videoDevices.length > 0 ? videoDevices : null);
    });
  }, []);

  const handleSelectMediaType = (mediaType: CallType) => {
    if (mediaType === 'audio') {
      setCallType('audio');
    }

    if (mediaType === 'video') {
      setCallType('video');
    }

    if (mediaType === 'audio_video') {
      setCallType('audio_video');
    }

    onClose();
  };

  const renderDevicesJoinButtons = (): JSX.Element => {
    if (audioDevices && !videoDevices) {
      return (
        <Button colorScheme='blue' onClick={() => handleSelectMediaType('audio')}>
          Audio
        </Button>
      );
    }

    if (videoDevices && !audioDevices) {
      return (
        <Button colorScheme='blue' onClick={() => handleSelectMediaType('video')}>
          Video
        </Button>
      );
    }

    if (audioDevices && videoDevices) {
      return (
        <React.Fragment>
          <Button colorScheme='blue' onClick={() => handleSelectMediaType('audio_video')}>
            Audio and Video
          </Button>
        </React.Fragment>
      );
    }

    return (
      <Flex margin={'auto'}>
        <Text margin={'auto'} mr={1}>
          You can't join, no media devices found
        </Text>
        <Button onClick={() => router.push('/')}>Go back</Button>
      </Flex>
    );
  };

  return (
    <React.Fragment>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Joining room {roomName}</ModalHeader>
          <ModalCloseButton onClick={() => router.push('/')} />
          <ModalBody>How do you want to connect to the call?</ModalBody>
          <ModalFooter>
            {(audioDevices || videoDevices) && renderDevicesJoinButtons()}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default JoinRoomModal;
