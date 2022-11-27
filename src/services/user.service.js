/* eslint-disable import/no-anonymous-default-export */
import api from './api';

export default {
  whoami: async () => {
    const response = await api.get('/user/whoami');
    return response.data;
  },
  getUser: async (id) => {
    const response = await api.get('/user/findId/' + id);
    return response.data;
  },
  create: async (values) => {
    const response = await api.post('/user', values);
    return response;
  },
  update: async (values) => {
    const response = await api.patch('/user/update', values);
    return response;
  },
};
