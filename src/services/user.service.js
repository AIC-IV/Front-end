/* eslint-disable import/no-anonymous-default-export */
import api from './api';

export default {
  async whoami() {
    const response = await api.get('/user/whoami');
    return response.data;
  },
  async create(values) {
    const response = await api.post('/user', values);
    return response;
  },
};
