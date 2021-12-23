import React from 'react';
import type { NextPage } from 'next';
import { ClientConfig, IAgoraRTCClient, IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng';
import { Box } from '@chakra-ui/react';
import { Controls } from './Controls';
import { VideoList } from './VideoList';
import { createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react';

interface VideoCallProps {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  roomName: string;
  token: string;
  uid: string;
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
  const [users, setUsers] = React.useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = React.useState<boolean>(false);
  const appID = process.env.NEXT_PUBLIC_AGORA_APP_ID!;

  config = {
    mode: 'rtc',
    codec: 'vp8',
    appId: appID,
    token: token,
  };

  useClient = createClient(config);
  useMicroPhoneAndCameraTracks = createMicrophoneAndCameraTracks();

  const client = useClient();
  const { ready, tracks, error } = useMicroPhoneAndCameraTracks();

  React.useEffect(() => {
    let init = async (channelName: string) => {
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);

        if (mediaType === 'video') {
          setUsers((prevUsers) => [...prevUsers, user]);
        }

        if (mediaType === 'audio') {
          user.audioTrack?.play();
        }
      });

      client.on('user-unpublished', (user, mediaType) => {
        if (mediaType === 'audio') {
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
        await client.join(appID, channelName, token, parseInt(uid));

        if (tracks) {
          await client.publish([tracks[0], tracks[1]]);
        }

        setStart(true);
      } catch (err) {
        console.log(err);
      }
    };

    if (ready && tracks) {
      try {
        init(roomName);
      } catch (err) {
        console.log(err);
      }
    }
  }, [client, ready, tracks, roomName, token, appID, uid]);

  return (
    <React.Fragment>
      <Box maxWidth={'30%'}>
        {ready && tracks && (
          <React.Fragment>
            <Controls setInCall={setInCall} setStart={setStart} tracks={tracks} />
          </React.Fragment>
        )}

        {start && tracks && (
          <React.Fragment>
            <VideoList setInCall={setInCall} tracks={tracks} users={users} />
          </React.Fragment>
        )}
      </Box>
    </React.Fragment>
  );
};

export default VideoCall;
