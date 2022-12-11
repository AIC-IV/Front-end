import axios from 'axios';

import settings from '../../src/constants/settings.json';

let SOCKET_URL = '';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  SOCKET_URL = settings.development.socketBackendUrl;
} else {
  SOCKET_URL = settings.production.socketBackendUrl;
}

const socketApi = axios.create({
  baseURL: `${SOCKET_URL}/api`,
});

socketApi.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    console.warn(error);
    return Promise.reject(error);
  }
);

export default socketApi;
