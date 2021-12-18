import React from 'react';
import type { NextPage } from 'next';

interface VideoProps {}

export const Video: NextPage<VideoProps> = (): JSX.Element => {
  const [showVideo, setShowVideo] = React.useState<boolean>(false);
  const videoRef = React.useRef<HTMLVideoElement & { srcObject: MediaStream }>(null);

  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        setShowVideo(true);
        videoRef!.current!.srcObject = stream;
      })
      .catch(() => {
        setShowVideo(false);
      });
  }, []);

  return (
    <React.Fragment>
      {showVideo && <video muted autoPlay ref={videoRef}></video>}
    </React.Fragment>
  );
};
