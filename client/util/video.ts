import {
  createClient,
  createMicrophoneAndCameraTracks,
  ClientConfig,
} from 'agora-rtc-react';

export const AGORA_APP_ID = '9d64e5765a1346bc9ebf3b375ac2285a';
export const AGORA_TOKEN =
  '0069d64e5765a1346bc9ebf3b375ac2285aIABt79cQ68zD9vyKYNwgk8X04fYO4GaPdvNScPy+SAW5vmTNKL8AAAAAEAAr6nfpT+XDYQEAAQBP5cNh';

export const config: ClientConfig & { appId: string; token: string } = {
  mode: 'rtc',
  codec: 'vp8',
  appId: AGORA_APP_ID,
  token: AGORA_TOKEN,
};

export const useClient = createClient(config);
export const useMicroPhoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = 'main';
