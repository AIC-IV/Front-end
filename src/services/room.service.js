/* eslint-disable import/no-anonymous-default-export */
import socketApi from './socketApi';

export default {
  doesRoomExist: async (roomId) => {
    const response = await socketApi.get(`/doesRoomExist?id=${roomId}`);
    return response.data;
  }, 
};
