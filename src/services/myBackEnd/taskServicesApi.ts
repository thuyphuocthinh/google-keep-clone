import axiosInstanceFormData from "../../api/axiosInstanceFormData";
import { DOMAIN } from "../../constants";
import { BaseService } from "../baseService";

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
  createTask(task: FormData) {
    return axiosInstanceFormData.post(`${DOMAIN}/tasks/create`, task);
  }
  getStatusList() {
    return this.get(`${DOMAIN}/status/getListTaskStatus`);
  }
  updateTask(task: FormData) {
    return axiosInstanceFormData.patch(`${DOMAIN}/tasks/updateTask`, task);
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
  attachLabel(labelId: string, taskId: string) {
    return this.patch(`${DOMAIN}/tasks/attachLabel/${taskId}/${labelId}`, {})
  }
  detachLabel(labelId: string, taskId: string) {
    return this.patch(`${DOMAIN}/tasks/detachLabel/${taskId}/${labelId}`, {})
  }
  getTaskReminded(userId: string) {
    return this.get(`${DOMAIN}/tasks/getTasksRemindedByUser/${userId}`);
  }
  pinTask(taskId: string) {
    return this.patch(`${DOMAIN}/tasks/pin/${taskId}`, {})
  }
  unpinTask(taskId: string) {
    return this.patch(`${DOMAIN}/tasks/unpin/${taskId}`, {})
  }
}

export const taskServiceApi = new TaskServiceApi();
