import {  getToken, removeToken } from './../helpers/getToken';
import axiosInstance from './axiosInstance';
import { STATUS_CODE } from '../constants';

axiosInstance.interceptors.request.use(
  (request) => {
    const accessToken = getToken();
    request.headers['Cache-Control'] = 'no-cache';
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
      request.headers.authorization = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // console.log("response success: ", response);
    return response;  
  },
  async (error) => {
    console.log("response error: ", error);
    const status: number = error?.status;
    // Handle 401 - Unauthorized
    if (status === STATUS_CODE.UNAUTHORIZED) {
      removeToken();
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
