export interface ENV_CONFIGURATION {
  PORT: number;
  AGORA_APP_ID: string;
  AGORA_APP_CERTIFICATE: string;
  JWT_AT_SECRET: string;
  JWT_RT_SECRET: string;
}

export default (): ENV_CONFIGURATION => ({
  PORT: parseInt(process.env.PORT, 10) || 5000,
  AGORA_APP_ID: process.env.AGORA_APP_ID,
  AGORA_APP_CERTIFICATE: process.env.AGORA_APP_CERTIFICATE,
  JWT_AT_SECRET: process.env.JWT_AT_SECRET,
  JWT_RT_SECRET: process.env.JWT_RT_SECRET,
});
