import React from 'react';
import type { NextPage } from 'next';
import {
  AgoraVideoPlayer,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-react';
import { Video } from './Video';
import { SimpleGrid } from '@chakra-ui/react';

interface VideoListProps {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  users: IAgoraRTCRemoteUser[];
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}

export const VideoList: NextPage<VideoListProps> = ({ users, tracks }): JSX.Element => {
  const [gridSpacing, setGridSpacing] = React.useState<number>();

  React.useEffect(() => {
    setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 4));
  }, [users, tracks]);

  const renderVideos = (): void => {
    users.length > 0 &&
      users.map((user) => {
        if (user.hasVideo) {
          return <Video key={user.uid} videoTrack={user.videoTrack!} />;
        }
        return null;
      });
  };

  return (
    <React.Fragment>
      <SimpleGrid columns={users.length} spacing={gridSpacing}>
        <AgoraVideoPlayer
          videoTrack={tracks[1]}
          style={{ height: '100%', width: '100%' }}
        />
        {renderVideos}
      </SimpleGrid>
    </React.Fragment>
  );
};
