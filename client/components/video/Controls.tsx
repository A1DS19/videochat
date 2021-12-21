import React from 'react';
import type { NextPage } from 'next';
import { IMicrophoneAudioTrack, ICameraVideoTrack } from 'agora-rtc-react';

//TWT min: 51:45

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
  return <React.Fragment></React.Fragment>;
};
