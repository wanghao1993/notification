import axios from 'axios';

export const dfHttp = axios.create({
  timeout: 10000,
  baseURL: 'http://localhost:3000',
  withCredentials: false,
});

fetch('');
dfHttp.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    console.log(error);
  }
);

dfHttp.interceptors.request.use((config) => {
  return config;
});
