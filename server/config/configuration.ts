export interface ENV_CONFIGURATION {
  AGORA_APP_ID: string;
  AGORA_APP_CERTIFICATE: string;
}

export default (): ENV_CONFIGURATION => ({
  AGORA_APP_ID: process.env.AGORA_APP_ID,
  AGORA_APP_CERTIFICATE: process.env.AGORA_APP_CERTIFICATE,
});
