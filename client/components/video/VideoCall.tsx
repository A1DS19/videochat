import React from 'react';
import type { NextPage } from 'next';
import {
  ClientConfig,
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  ILocalTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-sdk-ng';
import { Box } from '@chakra-ui/react';
import { Controls } from './Controls';
import { VideoList } from './VideoList';
import {
  createClient,
  createCameraVideoTrack,
  createMicrophoneAudioTrack,
} from 'agora-rtc-react';

interface VideoCallProps {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  roomName: string;
  token: string;
  uid: number;
}

export let config: ClientConfig & { appId: string; token: string };
export let useClient: () => IAgoraRTCClient;
export let useMicroPhoneAndCameraTracks: any;

export const VideoCall: NextPage<VideoCallProps> = ({
  setInCall,
  roomName,
  token,
  uid,
}): JSX.Element => {
  const appID = process.env.NEXT_PUBLIC_AGORA_APP_ID!;
  const [users, setUsers] = React.useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = React.useState<boolean>(false);

  config = {
    mode: 'rtc',
    codec: 'vp8',
    appId: appID,
    token: token,
  };

  useClient = createClient(config);
  const client = useClient();

  //  useMicroPhoneAndCameraTracks = createMicrophoneAndCameraTracks();
  //  const { ready, tracks } = useMicroPhoneAndCameraTracks();

  const useMicrophoneTrack = createMicrophoneAudioTrack();
  const useCameraTrack = createCameraVideoTrack();

  const localAudioTrack = useMicrophoneTrack();
  const localVideoTrack = useCameraTrack();

  const { ready: micReady, track: micTrack } = localAudioTrack;
  const { ready: camReady, track: camTrack } = localVideoTrack;

  const ready = micReady || camReady || (micReady && camReady);
  const tracks =
    (micTrack && micTrack) ||
    (camTrack && camTrack) ||
    (micTrack && camTrack && ([micTrack, camTrack] as ILocalTrack[]));

  React.useEffect(() => {
    let init = async (channelName: string) => {
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);

        if (mediaType === 'video') {
          setUsers((prevUsers) => [...prevUsers, user]);
        }

        if (mediaType === 'audio') {
          user.audioTrack?.play();
          setUsers((prevUsers) => [...prevUsers, user]);
        }
      });

      client.on('user-unpublished', (user, mediaType) => {
        if (mediaType === 'audio') {
          setUsers((prevUsers) =>
            prevUsers.filter((prev_user) => prev_user.uid !== user.uid)
          );

          if (user.audioTrack) {
            user.audioTrack.stop();
          }
        }

        if (mediaType === 'video') {
          setUsers((prevUsers) =>
            prevUsers.filter((prev_user) => prev_user.uid !== user.uid)
          );
        }
      });

      client.on('user-left', (user) => {
        setUsers((prevUsers) =>
          prevUsers.filter((prev_user) => prev_user.uid !== user.uid)
        );
      });

      try {
        await client.join(appID, channelName, token, uid);
      } catch (err) {
        console.error('JOIN ERROR', err);
      }

      try {
        if (tracks) {
          await client.publish(tracks);
          setStart(true);
        }
      } catch (error) {
        console.error('PUBLISH ERROR', error);
      }
    };

    if (ready && tracks) {
      try {
        init(roomName);
      } catch (err) {
        console.error('INIT ERROR', err);
      }
    }
  }, [roomName, client, ready, tracks]);

  return (
    <React.Fragment>
      <Box maxWidth={'30%'}>
        {ready && tracks && (
          <React.Fragment>
            <Controls
              setInCall={setInCall}
              setStart={setStart}
              tracks={[micTrack, camTrack]}
              client={client}
            />
          </React.Fragment>
        )}

        {start && tracks && (
          <React.Fragment>
            <VideoList
              setInCall={setInCall}
              tracks={[micTrack, camTrack]}
              users={users}
              localUID={uid}
            />
          </React.Fragment>
        )}
      </Box>
    </React.Fragment>
  );
};

export default VideoCall;
