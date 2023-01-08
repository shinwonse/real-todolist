import axios from 'axios';

import { SERVER_BASE_URI } from '@/constants';
import Router from '@/Router';

const instance = axios.create({
  baseURL: SERVER_BASE_URI,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          Router.push('/login');
          return new Promise(() => {});
        case 403:
          Router.push('/login');
          return new Promise(() => {});
        case 404:
          Router.push('/');
          return new Promise(() => {});
        default:
          return Promise.reject(error);
      }
    }
  }
);

export default instance;
