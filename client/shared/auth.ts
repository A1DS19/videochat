import { api } from './axios';

export type SignupType = {
  email: string;
  password: string;
};

export type SigninType = SignupType;

type AuthRes = {
  access_token: string;
  refresh_token: string;
};

export const signup = async (dto: SignupType): Promise<AuthRes> => {
  const { data } = await api.post('/auth/signup', dto);

  if (data) {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
  }

  return data;
};

export const signin = async (dto: SigninType): Promise<AuthRes> => {
  const { data } = await api.post('/auth/signin', dto);

  if (data) {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
  }

  return data;
};

export const logout = async (): Promise<boolean> => {
  const { status } = await api.post('/auth/logout', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });

  if (status !== 200) {
    return false;
  }

  return true;
};
