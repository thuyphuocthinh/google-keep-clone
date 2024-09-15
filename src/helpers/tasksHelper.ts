import { STATUS_CODE } from "../constants";
import { taskServiceApi } from "../services/taskServicesApi";

export const getTasksApi = async (userId: string, store: any) => {
  try {
    const result = await taskServiceApi.getTasksList(userId);
    if (result.status === STATUS_CODE.SUCCESS && result.data.success) {
      store.dispatch("tasksModule/setTasksAction", result.data.data);
    }
  } catch (error) {
    console.log(error);
  }
};
