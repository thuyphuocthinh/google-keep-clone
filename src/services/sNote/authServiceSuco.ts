import axios from "axios";
import { DOMAIN } from "../../constants/index";
import { USER_SIGN_UP, USER_SIGN_IN } from "../../models/user";
import axiosInstance from "../../api/axiosInterceptor";

export class AuthServiceSuco {

  loginService(user: USER_SIGN_IN) {
    return new Promise(async (resolve, reject) => {
        axios.post(`${DOMAIN}api/v1/oauth/token`, user, {
            headers: {
              "Content-Type": "application/json",
            },
          }).then(response => resolve(response)).catch(error => reject(error.response));
    })
  }

  registerService(user: USER_SIGN_UP) {
    return new Promise(async (resolve, reject) => {
        axios.post(`${DOMAIN}api/v1/user/sign-up`, user, {
            headers: {
              "Content-Type": "application/json",
            },
          }).then(response => resolve(response)).catch(error => reject(error.response));
    })
  }

  refreshTokenService(refreshToken: string) {
    return new Promise(async (resolve, reject) => {
      axios.post(`${DOMAIN}api/v1/refresh_tokens`, {refreshToken: refreshToken})
        .then(response => resolve(response))
        .catch(error => reject(error.response));
    })
  }

  logoutService() {
    return axiosInstance.post(`${DOMAIN}api/v1/oauth/revoke`);
  }
}

export const authServiceSuco = new AuthServiceSuco();
