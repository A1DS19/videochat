import React from 'react';
import type { NextPage } from 'next';
import { me } from '../../util/video';

interface VideoProps {}

export const Video: NextPage<VideoProps> = (): JSX.Element => {
  const [showVideo, setShowVideo] = React.useState<boolean>(false);
  const videoRef = React.useRef<HTMLVideoElement & { srcObject: MediaStream }>(null);
  const [errorMsg, setErrorMsg] = React.useState<string>();

  const detectWebcam = async (): Promise<boolean> => {
    try {
      const video = await navigator.mediaDevices.getUserMedia({ video: true });
      if (!video) {
        return false;
      }
      return true;
    } catch (error) {
      setErrorMsg('Video not connected');
      return false;
    }
  };

  const detectAudio = async (): Promise<boolean> => {
    try {
      const audio = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!audio) {
        return false;
      }
      return true;
    } catch (error) {
      setErrorMsg('Audio not connected');
      return false;
    }
  };

  const memoizedGetMedia = React.useCallback(async () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: await detectAudio(),
        video: await detectWebcam(),
      })
      .then(async (stream) => {
        (await detectWebcam()) &&
          (() => {
            setShowVideo(true);
            videoRef!.current!.srcObject = stream;
          });

        //Se puede conectar tanto si tiene los medios, como si no
        me();
      })
      .catch((err) => {
        setShowVideo(false);

        //Se puede conectar tanto si tiene los medios, como si no
        me();
      });
  }, []);

  React.useEffect(() => {
    memoizedGetMedia();
  }, [memoizedGetMedia]);

  return (
    <React.Fragment>
      {showVideo && <video muted autoPlay ref={videoRef}></video>}
    </React.Fragment>
  );
};
