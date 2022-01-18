import { api } from './axios';

export type SignupType = {
  email: string;
  password: string;
  userName: string;
};

export type SigninType = SignupType;

export type AuthRes = {
  access_token: string;
  refresh_token: string;
};

export const signup = async (dto: SignupType): Promise<AuthRes> => {
  const { data } = await api.post('/auth/local/signup', dto);

  if (data) {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
  }

  return data;
};

export const signin = async (dto: SigninType): Promise<AuthRes> => {
  const { data } = await api.post('/auth/local/signin', dto);

  if (data) {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
  }

  return data;
};

export const logout = async (): Promise<boolean> => {
  const { status } = await api.post('/auth/logout', null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });

  if (status !== 200) {
    return false;
  }

  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');

  return true;
};
