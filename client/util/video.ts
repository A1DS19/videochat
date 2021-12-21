import {
  createClient,
  createMicrophoneAndCameraTracks,
  ClientConfig,
} from 'agora-rtc-react';

export const config: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

export const useClient = createClient(config);
export const useMicroPhoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = 'main';
