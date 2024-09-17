import axiosInstance from "../api/axiosInterceptor";

export class BaseService {
  constructor() {}

  get(api: string) {
    return axiosInstance.get(api);
  }

  post(api: string, data: {}) {
    return axiosInstance.post(api, data);
  }

  put(api: string, data: {}) {
    return axiosInstance.put(api, data);
  }

  patch(api: string, data: {}) {
    return axiosInstance.patch(api, data);
  }

  delete(api: string) {
    return axiosInstance.delete(api);
  }
}
