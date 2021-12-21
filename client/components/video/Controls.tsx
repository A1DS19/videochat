import React from 'react';
import type { NextPage } from 'next';
import { IMicrophoneAudioTrack, ICameraVideoTrack } from 'agora-rtc-react';
import { useClient } from '../../util/video';
import { Button, SimpleGrid } from '@chakra-ui/react';

interface ControlsProps {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Controls: NextPage<ControlsProps> = ({
  setInCall,
  setStart,
  tracks,
}): JSX.Element => {
  type mediaType = 'audio' | 'video';
  const client = useClient();
  const [trackState, setTrackState] = React.useState<{ video: boolean; audio: boolean }>({
    video: true,
    audio: true,
  });

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
        await tracks[0].setEnabled(!trackState.audio);
        setTrackState((prevState) => {
          return { ...prevState, audio: !prevState.audio };
        });
        break;

      case 'video':
        await tracks[1].setEnabled(!trackState.video);
        setTrackState((prevState) => {
          return { ...prevState, video: !prevState.video };
        });
        break;
    }
  };

  const leaveChannel = async (): Promise<void> => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <React.Fragment>
      <SimpleGrid columns={3} spacing={1}>
        <Button
          colorScheme={button_on_off('audio')}
          onClick={async () => await mute('audio')}
        >
          MIC
        </Button>
        <Button
          colorScheme={button_on_off('video')}
          onClick={async () => await mute('video')}
        >
          VIDEO
        </Button>
        <Button onClick={async () => await leaveChannel()}>LEAVE</Button>
      </SimpleGrid>
    </React.Fragment>
  );
};
