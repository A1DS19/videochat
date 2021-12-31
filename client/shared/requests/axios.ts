import axios from 'axios';
//arreglar refresh token

let isFetchingToken = false;
export const api = axios.create({
  baseURL: 'http://localhost:5000',
});

api.interceptors.request.use(
  (config) => {
    const refresh_token_or_access_token =
      config.url === '/auth/refresh' ? 'refresh_token' : 'access_token';

    const token = 'Bearer ' + localStorage.getItem(refresh_token_or_access_token);

    if (token) {
      config.headers!['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const {
      config,
      response: { status },
    } = err;

    const originalRequest = config;

    if (
      originalRequest.url !== '/auth/local/signin' ||
      (originalRequest.url !== '/auth/local/signup' && status === 401)
    ) {
      if (!isFetchingToken) {
        try {
          isFetchingToken = true;
          const token = !!localStorage.getItem('refresh_token')
            ? JSON.stringify('Bearer ' + localStorage.getItem('refresh_token'))
            : '';

          const rs = await api.post('/auth/refresh', null, {
            headers: {
              Authorization: token,
            },
          });

          const { access_token, refresh_token } = rs.data;
          localStorage.removeItem('access_token');
          localStorage.setItem('access_token', access_token);

          localStorage.removeItem('refresh_token');
          localStorage.setItem('refresh_token', refresh_token);

          return api(originalRequest);
        } catch (_error) {
          return Promise.reject(_error);
        } finally {
          isFetchingToken = false;
        }
      }
    }

    return Promise.reject(err);
  }
);
