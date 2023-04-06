import axios from 'axios';
import type { DefaultQueryError } from '@/api/types';
import { apiUrl, API_FETCH_TIMEOUT } from './constants';

export const publicHttpClient = axios.create({
  baseURL: apiUrl,
  timeout: API_FETCH_TIMEOUT * 1000,
});

const httpClient = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  timeout: API_FETCH_TIMEOUT * 1000,
});

httpClient.defaults.headers.common['Content-Type'] = 'application/json';

httpClient.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  async (error: DefaultQueryError) => {
    return Promise.reject(error);
  }
);

export default httpClient;
