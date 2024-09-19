import axiosInstance from './axiosInstance';
import { getAccessToken, getRefreshToken, removeAccessToken, removeRefreshToken, setAccessToken, setRefreshToken} from '../helpers/getToken';
import { REFRESH_TOKEN, STATUS_CODE } from '../constants';
import { authServiceSuco } from '../services/sNote/authServiceSuco';
import { toast } from 'vue3-toastify';

axiosInstance.interceptors.request.use(
    function (request: any) {
      const accessToken = getAccessToken();

      const newHeaders = {
        ...request.headers,
        Authorization: `Bearer ${accessToken}`,
      };
  
      request = {
        ...request,
        headers: newHeaders,
      };
  
      return request;
    },
    function (error) {
      return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    function (response: any) {
      return response;
    },
    async function (error) {
      const response: any = error.response;
      const config: any = error.config;
      const status: number = response?.status;
      // 401 - expired access token => refresh token
      if(status === STATUS_CODE.UNAUTHORIZED) {
        const refreshToken = getRefreshToken(REFRESH_TOKEN);
        try {
          const result: any = await authServiceSuco.refreshTokenService(refreshToken);
          const statusCode: number = result.status;
          if (statusCode === STATUS_CODE.SUCCESS) {
            const accessToken = result.data.data.access_token;
            const refreshToken = result.data.data.refresh_token;
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            config.headers.Authorization = `Bearer ${accessToken}`;
          }  
        } catch (error) {
          // if refresh token is incorrect => redirect to login page
          removeAccessToken();
          removeAccessToken();
          toast.error("Invalid token");
          window.location.href = "/auth/login";
          console.log(error);
        }        
      } else if (status === STATUS_CODE.FORBIDDEN) {
        // 403 - wrong access token => redirect to login page 
        removeAccessToken();
        removeRefreshToken();
        toast.error("Invalid token");
        window.location.href = "/auth/login";
      }
      return Promise.reject(error.response);
    },
);

export default axiosInstance;