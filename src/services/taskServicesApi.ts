import { DOMAIN } from "../constants";
import { Task } from "../models/task";
import { BaseService } from "./baseService";

class TaskServiceApi extends BaseService {
  getTasksList(userId: string) {
    return this.get(`${DOMAIN}/tasks/getAllTasksByUser/${userId}`);
  }
  getTaskDetail(taskId: string) {
    return this.get(`${DOMAIN}/tasks/getDetail/${taskId}`);
  }
  createTask(task: Task) {
    return this.post(`${DOMAIN}/tasks/create`, task);
  }
  getStatusList() {
    return this.get(`${DOMAIN}/status/getListTaskStatus`);
  }
}

export const taskServiceApi = new TaskServiceApi();
