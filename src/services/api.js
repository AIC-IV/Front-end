import axios from 'axios';

const api = axios.create({
  baseURL: 'https://guess-drawing-serv.herokuapp.com',
});

api.interceptors.request.use(async (config) => {
  // console.info(`${config.method?.toUpperCase()} ${config.url}`)

  return config;
}, (error) => {
  console.warn(error)
  return Promise.reject(error)
});

export default api;