import { Task } from "../../../models/task";

export default {
  setTasksAction({ commit }: any, tasks: Task[]) {
    commit("setTasks", tasks);
  },
  setTaskDetailAction({ commit }: any, taskDetail: Task) {
    commit("setTaskDetail", taskDetail);
  },
};
