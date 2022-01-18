import React from 'react';
import type { NextPage } from 'next';
import {
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  IAgoraRTCClient,
} from 'agora-rtc-react';
import { Button, SimpleGrid, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { RoomsContext } from '../../shared/context/rooms/RoomsProvider';
import { socket, leave_room } from '../../shared/context/rooms/chat';
import { UsersContext } from '../../shared/context/users/UsersProvider';
//import { socket, leave_room } from '../../shared/context/rooms/chat';

interface ControlsProps {
  tracks:
    | [IMicrophoneAudioTrack | null, ICameraVideoTrack | null]
    | [IMicrophoneAudioTrack, ICameraVideoTrack]
    | null;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  client: IAgoraRTCClient;
}

export const Controls: NextPage<ControlsProps> = ({
  setInCall,
  setStart,
  tracks,
  client,
}): JSX.Element => {
  type mediaType = 'audio' | 'video';
  const toast = useToast();
  const router = useRouter();
  const { currentRoom } = React.useContext(RoomsContext);
  const { currentUser } = React.useContext(UsersContext);
  const [trackState, setTrackState] = React.useState<{ video: boolean; audio: boolean }>({
    video: true,
    audio: true,
  });

  React.useEffect(() => {
    socket.on('leftRoom', (res) => {
      toast({
        status: 'info',
        duration: 3000,
        isClosable: true,
        title: `User ${res} left`,
      });
    });
  }, []);

  const button_on_off = (type: mediaType): string => {
    switch (type) {
      case 'audio':
        return trackState.audio ? 'green' : 'red';
      case 'video':
        return trackState.video ? 'green' : 'red';
    }
  };

  const mute = async (type: mediaType): Promise<void> => {
    switch (type) {
      case 'audio':
        await tracks![0]!.setEnabled(!trackState.audio);
        setTrackState((prevState) => {
          return { ...prevState, audio: !prevState.audio };
        });
        break;

      case 'video':
        await tracks![1]!.setEnabled(!trackState.video);
        setTrackState((prevState) => {
          return { ...prevState, video: !prevState.video };
        });
        break;
    }
  };

  const leaveChannel = (): void => {
    client
      .leave()
      .then(() => {
        client.removeAllListeners();
        tracks![0] && tracks![0].close();
        tracks![1] && tracks![1].close();
        setStart(false);
        setInCall(false);
        leave_room({ roomName: currentRoom?.url_name!, user: currentUser! });
        router.push('/').then(() => {
          location.reload();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <SimpleGrid columns={3} spacing={1}>
        {tracks![0] && (
          <Button
            colorScheme={button_on_off('audio')}
            onClick={async () => await mute('audio')}
          >
            MIC
          </Button>
        )}

        {tracks![1] && (
          <Button
            colorScheme={button_on_off('video')}
            onClick={async () => await mute('video')}
          >
            VIDEO
          </Button>
        )}

        <Button
          onClick={async () => {
            await leaveChannel();
          }}
        >
          LEAVE
        </Button>
      </SimpleGrid>
    </React.Fragment>
  );
};
