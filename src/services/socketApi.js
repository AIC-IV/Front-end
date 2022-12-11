import axios from 'axios';

import settings from '../../src/constants/settings.json';

const SOCKET_URL = settings.socketBackendUrl;

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
