import React from 'react';
import type { NextPage } from 'next';
import {
  AgoraVideoPlayer,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-react';
import { Video } from './Video';
import { Box, Text } from '@chakra-ui/react';

interface VideoListProps {
  tracks: [IMicrophoneAudioTrack | null, ICameraVideoTrack | null];
  users: IAgoraRTCRemoteUser[];
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  localUID: number;
}

export const VideoList: NextPage<VideoListProps> = ({
  users,
  tracks,
  localUID,
}): JSX.Element => {
  const renderNoVideo = (): JSX.Element => {
    return (
      <React.Fragment>
        <Box color={'white'} backgroundColor={'black'} height={'200px'} width={'200px'}>
          no video
        </Box>
      </React.Fragment>
    );
  };

  const renderVideos = (): false | (JSX.Element | null)[] => {
    return (
      users &&
      users.map((user) => {
        console.log(user);

        if (user.hasVideo) {
          return <Video key={user.uid} videoTrack={user.videoTrack!} />;
        }

        if (user.hasAudio && !user.hasVideo) {
          return renderNoVideo();
        }

        return null;
      })
    );
  };

  return (
    <React.Fragment>
      <Box className='videos'>
        {tracks[1] ? (
          <AgoraVideoPlayer className='video' videoTrack={tracks[1]} />
        ) : (
          renderNoVideo()
        )}

        {renderVideos()}
      </Box>
    </React.Fragment>
  );
};
