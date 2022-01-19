import React from 'react';
import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { Controls } from './Controls';
import { VideoList } from './VideoList';
import {
  createClient,
  createMicrophoneAudioTrack,
  createCameraVideoTrack,
  createMicrophoneAndCameraTracks,
} from 'agora-rtc-react';
import {
  ClientConfig,
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  UID,
} from 'agora-rtc-sdk-ng';
import { CallType } from '../../pages/room/[roomName]';
import { ChatIndex } from '../rooms/chat/ChatIndex';

interface VideoCallProps {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  roomName: string;
  token: string;
  uid: number;
  callType: CallType;
}

export let config: ClientConfig;
export let useClient: () => IAgoraRTCClient;
export type UserSpeakingType = {
  level: number;
  uid: UID;
};

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
  const [userSpeaking, setUserSpeaking] = React.useState<UserSpeakingType | null>(null);

  config = {
    mode: 'rtc',
    codec: 'vp8',
  };

  console.log(uid);

  useClient = createClient(config);
  const client = useClient();
  let tracks: {
    type: CallType | null;
    tracks:
      | [IMicrophoneAudioTrack, ICameraVideoTrack]
      | null
      | IMicrophoneAudioTrack
      | null
      | ICameraVideoTrack
      | null;
  } = { tracks: null, type: null };
  let ready: boolean = false;

  if (callType === 'audio') {
    const { ready: audioReady, track } = createMicrophoneAudioTrack()();
    ready = audioReady;
    tracks = { type: 'audio', tracks: track };
  }

  if (callType === 'video') {
    const { ready: videoReady, track } = createCameraVideoTrack()();
    ready = videoReady;
    tracks = { type: 'video', tracks: track };
  }

  if (callType === 'audio_video') {
    const { ready: audioVideoReady, tracks: audioVideoTracks } =
      createMicrophoneAndCameraTracks()();
    ready = audioVideoReady;
    tracks = { type: 'audio_video', tracks: audioVideoTracks };
  }

  const init = async (channelName: string): Promise<void> => {
    client.on('user-published', async (user, mediaType) => {
      await client.subscribe(user, mediaType);

      if (mediaType === 'video') {
        setUsers((prevUsers) => {
          if (!prevUsers.find((User) => User.uid === user.uid)) {
            return [...prevUsers, user];
          }

          return prevUsers;
        });
      }

      if (mediaType === 'audio') {
        user.audioTrack?.play();
        setUsers((prevUsers) => {
          if (!prevUsers.find((User) => User.uid === user.uid)) {
            return [...prevUsers, user];
          }

          return prevUsers;
        });
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

    client.enableAudioVolumeIndicator();
    client.on('volume-indicator', (volumes) => {
      volumes.forEach((volume) => {
        //yo
        if (uid == volume.uid && volume.level > 5) {
          setUserSpeaking(volume);
        }

        if (uid == volume.uid && volume.level < 5) {
          setUserSpeaking(null);
        }

        //peers
        if (uid != volume.uid && volume.level > 5) {
          setUserSpeaking(volume);
        }

        if (uid != volume.uid && volume.level < 5) {
          setUserSpeaking(null);
        }
      });
    });

    await client.join(appID, channelName, token, uid);
    if (tracks.tracks) await client.publish(tracks.tracks);
    setStart(true);
  };

  React.useEffect(() => {
    if (ready && tracks.tracks) {
      init(roomName);
    }
  }, [roomName, client, ready, tracks.tracks]);

  return (
    <React.Fragment>
      <Box maxWidth={'30%'}>
        {ready && tracks.tracks && (
          <React.Fragment>
            <Controls
              setInCall={setInCall}
              setStart={setStart}
              tracks={
                tracks.type === 'audio'
                  ? [tracks.tracks, null]
                  : tracks.type === 'video'
                  ? [null, tracks.tracks]
                  : tracks.type === 'audio_video' && (tracks.tracks as any)
              }
              client={client}
            />
          </React.Fragment>
        )}

        {start && tracks.tracks && (
          <React.Fragment>
            <VideoList
              setInCall={setInCall}
              tracks={
                tracks.type === 'audio'
                  ? [tracks.tracks, null]
                  : tracks.type === 'video'
                  ? [null, tracks.tracks]
                  : tracks.type === 'audio_video' && (tracks.tracks as any)
              }
              users={users}
              localUID={uid}
              userSpeaking={userSpeaking}
            />
          </React.Fragment>
        )}
      </Box>
      {start && tracks.tracks && <ChatIndex roomName={roomName} />}
    </React.Fragment>
  );
};

export default VideoCall;
