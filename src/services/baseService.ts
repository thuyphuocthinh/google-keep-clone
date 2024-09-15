import axios from "axios";
import Cookie from "js-cookie";
import { TOKEN } from "../constants";

const token = Cookie.get(TOKEN);

export class BaseService {
  constructor() {}

  get(api: string) {
    return axios.get(api, {
      headers: {
        Authorization: `BEARER ${token}`,
      },
    });
  }

  post(api: string, data: {}) {
    return axios.post(api, data, {
      headers: {
        Authorization: `BEARER ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  put(api: string, data: {}) {
    return axios.put(api, data, {
      headers: {
        Authorization: `BEARER ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  patch(api: string, data: {}) {
    return axios.put(api, data, {
      headers: {
        Authorization: `BEARER ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  delete(api: string) {
    return axios.delete(api, {
      headers: {
        Authorization: `BEARER ${token}`,
      },
    });
  }
}
