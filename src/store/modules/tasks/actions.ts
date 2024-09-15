import { Task } from "../../../models/task";

export default {
  async setTasksAction({ commit }: any, tasks: Task[]) {
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
};
