import { api } from '../../requests/axios';
import { User } from './types';

export const me = async (): Promise<User> => {
  const { data } = await api.get('/users/me', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });

  return data;
};
