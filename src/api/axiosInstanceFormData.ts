// src/api/axiosInstance.js
import axios from 'axios';
import { DOMAIN } from '../constants';
import {  getToken, removeToken } from './../helpers/getToken';
import { STATUS_CODE } from '../constants';

const axiosInstanceFormData = axios.create({
  baseURL: DOMAIN,
  timeout: 5000,
  headers: { 'Content-Type': 'multipart/form-data'},
  withCredentials: true,
});

axiosInstanceFormData.interceptors.request.use(
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

axiosInstanceFormData.interceptors.response.use(
  (response) => {
    return response;  
  },
  async (error) => {
    // console.log("response error: ", error);
    const status: number = error.status;
    // Handle 401 - Unauthorized
    if (status === STATUS_CODE.UNAUTHORIZED) {
      removeToken();
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstanceFormData;

