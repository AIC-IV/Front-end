/* eslint-disable import/no-anonymous-default-export */
import socketApi from './socketApi';

export default {
  doesRoomExist: async (roomId) => {
    const response = await socketApi.get(`/doesRoomExist?id=${roomId}`);
    return response.data;
  },
  createRoom: async (data) => {
    const response = await socketApi.post(`/createRoom`, data);
    return response.data;
  },
  joinRoom: async (roomId, username) => {
    const response = await socketApi.post(`/joinRoom`, { roomId, username });
    return response.data;
  },
};
