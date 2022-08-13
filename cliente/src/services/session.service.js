/* eslint-disable import/no-anonymous-default-export */
import api from './api'

export default {
  login: async (email, password) => {
    const response = await api.post('/session', { email, password });

    if (response.status === 200) {
      return response.data;
    }

    throw new Error(response.data.message);
  },

  refresh: async () => {
    const response = await api.get('/session');

    if (response.status === 200) {
      return response.data;
    }

    throw new Error(response.data.message);
  }
}
