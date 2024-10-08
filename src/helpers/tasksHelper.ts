import { toast } from "vue3-toastify";
import { STATUS_CODE } from "../constants";
import { taskServiceApi } from "../services/myBackEnd/taskServicesApi";

export const getTasksApi = async (userId: string, store: any) => {
  try {
    const result = await taskServiceApi.getTasksList(userId);
    // console.log("get tasks result: ", result);
    if (result.status === STATUS_CODE.SUCCESS && result.data.success) {
      store.dispatch("tasksModule/setTasksAction", result.data.data);
    }
  } catch (error: any) {
    console.log(error);
    toast.error(error.data?.message);
  }
};

export const updateTaskApi = (taskUpdate: FormData, userId: string, store: any) => {
  try {
    store.dispatch("loading/showLoadingAction");
    setTimeout(async () => {
      const result = await taskServiceApi.updateTask(taskUpdate);
      if (result.status === STATUS_CODE.SUCCESS && result.data.success) {
        await getTasksApi(userId, store);
        store.dispatch("modal/closeModalAction");
        toast.success(result.data.message);
      } else {
        toast.error(result.data.message);
      }
      store.dispatch("loading/hideLoadingAction");
    }, 1000);
  } catch (error) {
    console.log(error);
  }
};

export const getStatusListApi = async (store: any) => {
  try {
    const result = await taskServiceApi.getStatusList();
    if (result.status === STATUS_CODE.SUCCESS && result.data.success) {
      store.dispatch("tasksModule/setStatusListAction", result.data.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteTaskApi = async (
  store: any,
  taskId: string,
  userId: string
) => {
  try {
    const result = await taskServiceApi.deleteTask(taskId);
    if (result.status === STATUS_CODE.SUCCESS && result.data.success) {
      await getTasksApi(userId, store);
      toast.success(result.data.message);
    } else {
      toast.error(result.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteManyTaskApi = async (
  userId: string,
  store: any,
  listTaskId: string[]
) => {
  try {
    const result = await taskServiceApi.deleteManyTasks(listTaskId);
    if (result.status === STATUS_CODE.SUCCESS && result.data.success) {
      store.dispatch("tasksModule/resetTasksSelectedAction");
      await getTasksApi(userId, store);
      toast.success(result.data.message);
    } else {
      toast.error(result.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTasksDeleted = async (userId: string, store: any) => {
  try {
    const result = await taskServiceApi.getTasksDeletedList(userId);
    if (result.status === STATUS_CODE.SUCCESS && result.data.success) {
      store.dispatch("tasksModule/setDeletedTasksAction", result.data.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteManyTaskPermanently = async (
  userId: string,
  listTaskId: string[],
  store: any
) => {
  try {
    const result = await taskServiceApi.deleteManyTaskPermanently(listTaskId);
    if (result.status === STATUS_CODE.SUCCESS && result.data.success) {
      await getTasksDeleted(userId, store);
      store.dispatch("tasksModule/resetTasksSelectedAction");
      toast.success(result.data.message);
    } else {
      toast.error(result.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteTaskPermanently = async (
  userId: string,
  taskId: string,
  store: any
) => {
  try {
    const result = await taskServiceApi.deleteTaskPermanently(taskId);
    if (result.status === STATUS_CODE.SUCCESS && result.data.success) {
      await getTasksDeleted(userId, store);
      toast.success(result.data.message);
    } else {
      toast.error(result.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const recoverManyTask = async (
  listTaskId: string[],
  userId: string,
  store: any
) => {
  try {
    const result = await taskServiceApi.recoverManyTasks(listTaskId);
    if (result.status === STATUS_CODE.SUCCESS && result.data.success) {
      await getTasksDeleted(userId, store);
      store.dispatch("tasksModule/resetTasksSelectedAction");
      toast.success(result.data.message);
    } else {
      toast.error(result.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const recoverOneTask = async (
  taskId: string,
  userId: string,
  store: any
) => {
  try {
    const result = await taskServiceApi.recoverOneTask(taskId);
    if (result.status === STATUS_CODE.SUCCESS && result.data.success) {
      await getTasksDeleted(userId, store);
      toast.success(result.data.message);
    } else {
      toast.error(result.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const searchTasks = async (userId: string, keyword: string, store: any) => {
  try {
    const result = await taskServiceApi.searchTasks(keyword, userId);
    if (result.status === STATUS_CODE.SUCCESS && result.data.success) {
      store.dispatch("tasksModule/setTasksSearchAction", result.data.data);
    } else {
      toast.error(result.data.message);
    }
  } catch (error) {
    console.log(error);
  }
}

export const changeStatus = async (userId: string, taskUpdate: {taskId: string, newStatusCode: string}, store: any) => {
  try {
    const result = await taskServiceApi.changeStatus(taskUpdate);
    if (result.status === STATUS_CODE.SUCCESS && result.data.success) {
      await getTasksApi(userId, store);
    } 
  } catch (error: any) {
    toast.error(error.data.message);
  }
}

export const attachLabel = async(userId: string, taskId: string, labelId: string, store: any) => {
  try {
    const result = await taskServiceApi.attachLabel(labelId, taskId);
    if (result.status === STATUS_CODE.SUCCESS && result.data.success) {
      toast.success(result.data.message);
      await getTasksApi(userId, store);
    } 
  } catch (error: any) {
    console.log(error);
    toast.error(error.data.message);
  }
}

export const detachLabel = async(userId: string, taskId: string, labelId: string, store: any) => {
  try {
    const result = await taskServiceApi.detachLabel(labelId, taskId);
    if (result.status === STATUS_CODE.SUCCESS && result.data.success) {
      toast.success(result.data.message);
      await getTasksApi(userId, store);
    } 
  } catch (error: any) {
    toast.error(error.data.message);
  }
}

export const getTaskReminded = async (userId: string, store: any) => {
  try {
    const result = await taskServiceApi.getTaskReminded(userId);
    if(result.status === STATUS_CODE.SUCCESS) {
      store.dispatch("tasksModule/setTasksRemindedAction", result.data.data);
    }
  } catch (error) {
    console.log(error);
  }
}

export const pinTask = async (taskId: string, userId: string, store: any) => {
  try {
    const result = await taskServiceApi.pinTask(taskId);
    if (result.status === STATUS_CODE.SUCCESS) {
      await getTasksApi(userId, store);
      toast.success(result.data.message);
    }
  } catch (error) {
    console.log(error);
  }
}

export const unpinTask = async (taskId: string, userId: string, store: any) => {
  try {
    const result = await taskServiceApi.unpinTask(taskId);
    if (result.status === STATUS_CODE.SUCCESS) {
      await getTasksApi(userId, store);
      toast.success(result.data.message);
    }
  } catch (error) {
    console.log(error);
  }
}