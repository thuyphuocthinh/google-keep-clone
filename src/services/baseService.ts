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
    return axios.patch(api, data, {
      headers: {
        Authorization: `BEARER ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  deletePermanently(api: string) {
    return axios.delete(api, {
      headers: {
        Authorization: `BEARER ${token}`,
      },
    });
  }

  deleteManyTasksPermanentlyBase(api: string, listTaskId: string[]) {
    return axios.patch(
      api,
      {
        listTaskId: listTaskId,
      },
      {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      }
    );
  }

  deleteTemporarily(api: string) {
    return axios.patch(
      api,
      {},
      {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      }
    );
  }

  deleteManyTasksTemporarily(api: string, listTaskId: string[]) {
    return axios.patch(
      api,
      {
        listTaskId: listTaskId,
      },
      {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      }
    );
  }

  recoverManyTasksBase(api: string, listTaskId: string[]) {
    return axios.patch(
      api,
      {
        listTaskId: listTaskId,
      },
      {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      }
    );
  }
}
