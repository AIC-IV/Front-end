/* eslint-disable import/no-anonymous-default-export */
import api from './api';

export default {
    getRanking: async (order, page) => {
        let query ='?';
        if (order) query += `operator=${order}&`;
        if (page) query += `page=${page}`;
        const response = await api.get(`/ranking${query}`);
        console.log(response);
        return response.data;
    }
}