import React from 'react';
import type { NextPage } from 'next';
import { AgoraVideoPlayer, IRemoteVideoTrack } from 'agora-rtc-react';

interface VideoProps {
  videoTrack: IRemoteVideoTrack;
}

export const Video: NextPage<VideoProps> = ({ videoTrack }): JSX.Element => {
  return (
    <React.Fragment>
      <AgoraVideoPlayer
        videoTrack={videoTrack}
        style={{ height: '100%', width: '100%' }}
      />
    </React.Fragment>
  );
};
