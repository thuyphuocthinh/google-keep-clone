import { DOMAIN } from "../constants";
import { Task } from "../models/task";
import { BaseService } from "./baseService";

class TaskServiceApi extends BaseService {
  getTasksList(userId: string) {
    return this.get(`${DOMAIN}/tasks/getAllTasksByUser/${userId}`);
  }
  getTasksDeletedList(userId: string) {
    return this.get(`${DOMAIN}/tasks/getAllTasksDeletedByUser/${userId}`);
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
  updateTask(taskUpdate: Task) {
    return this.patch(`${DOMAIN}/tasks/updateTask`, taskUpdate);
  }
  deleteTask(taskId: string) {
    return this.patch(`${DOMAIN}/tasks/deleteTask/${taskId}`, {});
  }
  deleteManyTasks(listTaskId: string[]) {
    return this.patch(
      `${DOMAIN}/tasks/deleteManyTask`,
      {listTaskId: listTaskId}
    );
  }
  deleteTaskPermanently(taskId: string) {
    return this.delete(
      `${DOMAIN}/tasks/deleteTaskPermanently/${taskId}`
    );
  }
  deleteManyTaskPermanently(listTaskId: string[]) {
    return this.patch(
      `${DOMAIN}/tasks/deleteManyTaskPermanently/`,
      {listTaskId: listTaskId}
    );
  }
  recoverOneTask(taskId: string) {
    return this.patch(`${DOMAIN}/tasks/recoverTask/${taskId}`, {});
  }
  recoverManyTasks(listTaskId: string[]) {
    return this.patch(
      `${DOMAIN}/tasks/recoverManyTask`,
      listTaskId
    );
  }
  searchTasks(keyword: string, userId: string) {
    return this.get(`${DOMAIN}/tasks/search/${userId}?keyword=${keyword}`)
  }

  changeStatus(taskUpdate: {taskId: string, newStatusCode: string}) {
    return this.patch(`${DOMAIN}/tasks/changeStatus`, {taskUpdate: taskUpdate})
  }
}

export const taskServiceApi = new TaskServiceApi();
