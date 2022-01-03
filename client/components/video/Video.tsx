import React from 'react';
import type { NextPage } from 'next';
import { AgoraVideoPlayer, IRemoteVideoTrack } from 'agora-rtc-react';
import { Text } from '@chakra-ui/react';

interface VideoProps {
  videoTrack: IRemoteVideoTrack;
}

export const Video: NextPage<VideoProps> = ({ videoTrack }): JSX.Element => {
  return (
    <React.Fragment>
      <AgoraVideoPlayer className='video' videoTrack={videoTrack} />
    </React.Fragment>
  );
};
