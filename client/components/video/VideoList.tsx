import React from 'react';
import type { NextPage } from 'next';
import {
  AgoraVideoPlayer,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-react';
import { Video } from './Video';
import { Box, SimpleGrid } from '@chakra-ui/react';

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

  const renderVideos = (): false | (JSX.Element | null)[] => {
    return (
      users.length > 0 &&
      users.map((user) => {
        if (user.hasVideo) {
          return <Video key={user.uid} videoTrack={user.videoTrack!} />;
        }
        return null;
      })
    );
  };

  return (
    <React.Fragment>
      <Box className='videos'>
        <AgoraVideoPlayer className='video' videoTrack={tracks[1]} />
        {renderVideos()}
      </Box>
    </React.Fragment>
  );
};
