import axiosInstance from './axiosInstance';
import { getAccessToken } from '../helpers/getToken';
import { STATUS_CODE } from '../constants';

axiosInstance.interceptors.request.use(
  (request) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // console.log("Request success: ", request);
    return request;
  },
  (error) => {
    // console.error("Request error: ", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // console.log("Response success: ", response);
    return response;
  },
  async (error) => {
    const response = error?.response;
    const status = response?.status;

    // console.log("Response error: ", error);
    
    // Handle 401 - Unauthorized
    if (status === STATUS_CODE.UNAUTHORIZED) {
      window.location.href = "/auth/login";
    }

    return Promise.reject(response || error);
  }
);

export default axiosInstance;
