import React from 'react';
import type { NextPage } from 'next';
import {
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-react';

interface VideoListProps {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  users: IAgoraRTCRemoteUser[];
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}

export const VideoList: NextPage<VideoListProps> = ({}): JSX.Element => {
  return <React.Fragment></React.Fragment>;
};
