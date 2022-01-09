import React from 'react';
import type { NextPage } from 'next';
import {
  AgoraVideoPlayer,
  IAgoraRTCRemoteUser,
  IRemoteVideoTrack,
} from 'agora-rtc-react';
import { UserSpeakingType } from './VideoCall';

interface VideoProps {
  videoTrack: IRemoteVideoTrack;
  user: IAgoraRTCRemoteUser;
  userSpeaking: UserSpeakingType | null;
}

export const Video: NextPage<VideoProps> = ({
  videoTrack,
  user,
  userSpeaking,
}): JSX.Element => {
  return (
    <React.Fragment>
      <AgoraVideoPlayer
        className={`video ${user?.uid === userSpeaking?.uid && 'user-speaking'}`}
        videoTrack={videoTrack}
      />
    </React.Fragment>
  );
};
