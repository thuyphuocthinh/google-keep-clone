import { Task, TaskStatus, TasksByStatus } from "../../../models/task";

export default {
  setTasksAction({ commit }: any, tasks: TasksByStatus[]) {
    commit("setTasks", tasks);
  },
  setTaskDetailAction({ commit }: any, taskDetail: Task) {
    commit("setTaskDetail", taskDetail);
  },
  setTasksSelectedAction({ commit }: any, id: number) {
    commit("setTasksSelected", id);
  },
  resetTasksSelectedAction({ commit }: any) {
    commit("resetTasksSelected");
  },
  setTasksSearchAction({ commit }: any, tasks: Task[]) {
    commit("setTasksSearch", tasks);
  },
  setStatusListAction({ commit }: any, statusList: TaskStatus[]) {
    commit("setStatusList", statusList);
  },
  setDeletedTasksAction({ commit }: any, tasks: Task[]) {
    commit("setDeletedTask", tasks);
  },
  setShowDeletedPermanentIconAction({ commit }: any) {
    commit("setShowDeletedPermanentIcon");
  },
  setTaskImageAction({commit} : any, taskImage: File) {
    commit("setTaskImage", taskImage)
  }
};
