import React from 'react';
import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { Controls } from './Controls';
import { VideoList } from './VideoList';
import {
  createClient,
  createMicrophoneAudioTrack,
  createCameraVideoTrack,
} from 'agora-rtc-react';
import {
  ClientConfig,
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ILocalTrack,
} from 'agora-rtc-sdk-ng';
import { CallType } from '../../pages/room/[roomName]';

interface VideoCallProps {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  roomName: string;
  token: string;
  uid: number;
  callType: CallType;
}

export let config: ClientConfig;
export let useClient: () => IAgoraRTCClient;

export const VideoCall: NextPage<VideoCallProps> = ({
  setInCall,
  roomName,
  token,
  uid,
  callType,
}): JSX.Element => {
  const appID = process.env.NEXT_PUBLIC_AGORA_APP_ID!;
  const [users, setUsers] = React.useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = React.useState<boolean>(false);

  config = {
    mode: 'rtc',
    codec: 'vp8',
  };

  useClient = createClient(config);
  const client = useClient();

  const { ready: camReady, track: camTrack } = createCameraVideoTrack()();
  const { ready: micReady, track: micTrack } = createMicrophoneAudioTrack()();

  const ready = micReady || camReady || (micReady && camReady);
  let tracks: ILocalTrack | ILocalTrack[] = [];

  if (camTrack && !micTrack) {
    tracks = camTrack;
  }

  if (micTrack && !camTrack) {
    tracks = micTrack;
  }

  if (micTrack && camTrack) {
    tracks = [micTrack, camTrack];
  }

  // const { ready, tracks, error } = createMicrophoneAndCameraTracks()();

  const init = async (channelName: string): Promise<void> => {
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
        user.audioTrack?.stop();
      }

      if (mediaType === 'video') {
        setUsers((prevUsers) => prevUsers.filter((User) => User.uid !== user.uid));
      }
    });

    client.on('user-left', (user) => {
      setUsers((prevUsers) => prevUsers.filter((User) => User.uid !== user.uid));
    });

    await client.join(appID, channelName, token, uid);
    if (tracks) await client.publish(tracks);
    setStart(true);
  };

  React.useEffect(() => {
    if (ready && tracks) {
      init(roomName);
      console.info(tracks);
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
