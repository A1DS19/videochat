import React from 'react';
import type { NextPage } from 'next';
import {
  AgoraVideoPlayer,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-react';
import { Video } from './Video';
import { Box, Grid, Text } from '@chakra-ui/react';
import { UserSpeakingType } from './VideoCall';

interface VideoListProps {
  tracks:
    | [IMicrophoneAudioTrack | null, ICameraVideoTrack | null]
    | [IMicrophoneAudioTrack, ICameraVideoTrack]
    | null;
  users: IAgoraRTCRemoteUser[];
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  localUID: number;
  userSpeaking: UserSpeakingType | null;
}

export const VideoList: NextPage<VideoListProps> = ({
  users,
  tracks,
  userSpeaking,
  localUID,
}): JSX.Element => {
  const renderNoVideo = (user?: IAgoraRTCRemoteUser): JSX.Element => {
    return (
      <React.Fragment>
        <Box
          color={'white'}
          backgroundColor={'black'}
          className={`video ${
            (user?.uid === userSpeaking?.uid ||
              localUID === parseInt(userSpeaking?.uid as string)) &&
            'user-speaking'
          }`}
        >
          <Text textAlign={'center'} fontSize={'xl'}>
            no video
          </Text>
        </Box>
      </React.Fragment>
    );
  };

  const renderVideos = (): false | (JSX.Element | null)[] => {
    return (
      users.length > 0 &&
      users.map((user) => {
        if (user.hasVideo && user.videoTrack) {
          return (
            <Video
              key={user.uid}
              userSpeaking={userSpeaking}
              user={user}
              videoTrack={user.videoTrack}
            />
          );
        }

        return renderNoVideo(user);
      })
    );
  };

  return (
    <React.Fragment>
      <Grid
        height={'50vh'}
        width={'70vw'}
        padding={'2rem'}
        templateColumns={'repeat(3, 1fr)'}
        gap={1}
      >
        {tracks![1] ? (
          <AgoraVideoPlayer
            className={`video ${
              localUID === parseInt(userSpeaking?.uid as string) && 'user-speaking'
            }`}
            videoTrack={tracks![1]}
          />
        ) : (
          renderNoVideo()
        )}
        {renderVideos()}
      </Grid>
    </React.Fragment>
  );
};
