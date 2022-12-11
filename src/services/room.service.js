/* eslint-disable import/no-anonymous-default-export */
import socketApi from './socketApi';

export default {
  doesRoomExist: async (roomId) => {
    console.log(roomId);
    const response = await socketApi.get(`/doesRoomExist?id=${roomId}`);
    return response.data;
  },
  createRoom: async (data) => {
    const response = await socketApi.post(`/createRoom`, data);
    return response.data;
  },
  joinRoom: async (roomId, username, image) => {
    const response = await socketApi.post(`/joinRoom`, { roomId, username, image });
    return response.data;
  },
  getRooms: async () => {
    const response = await socketApi.get(`/getRooms`);
    return response.data;
  }
};
