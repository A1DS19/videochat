import React from 'react';
import type { NextPage } from 'next';
import {
  channelName as channelNameProps,
  useClient,
  useMicroPhoneAndCameraTracks,
} from '../../util/video';
import { IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng';
import { SimpleGrid } from '@chakra-ui/react';
import { Controls } from './Controls';
import { VideoList } from './VideoList';

interface VideoCallProps {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}

export const VideoCall: NextPage<VideoCallProps> = ({ setInCall }): JSX.Element => {
  const [users, setUsers] = React.useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = React.useState<boolean>(false);
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
        await client.join(
          process.env.AGORA_APP_ID!,
          channelName, //Deberia pasarse como props
          process.env.AGORA_TOKEN!,
          null //Se puede setear manualmente(user id)
        );

        //Se publica NUESTRO stream al room
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
        init(channelNameProps);
      } catch (err) {
        console.log(err);
      }
    }
  }, [client, ready, tracks]);

  return (
    <React.Fragment>
      <SimpleGrid columns={4} spacing={2}>
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
      </SimpleGrid>
    </React.Fragment>
  );
};

export default VideoCall;
