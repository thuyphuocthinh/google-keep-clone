import axios from "axios";
import { DOMAIN } from "../../constants/index";

export class AuthService {
  loginService(user: {}) {
    return new Promise((resolve, reject) => {
      axios.post(`${DOMAIN}/auth/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then(response => resolve(response)).catch(error => reject(error.response));
    });
  }
  registerService(user: {}) {
    return axios.post(`${DOMAIN}/auth/register`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  verityToken(token: string) {
    return axios.post(
      `${DOMAIN}/auth/verifyToken`,
      { token: token },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export const authService = new AuthService();
