import { Task } from "../../../models/task";
import { State } from "./state";

export default {
  setTasks(state: State, tasks: Task[]) {
    state.tasks = tasks;
  },
  setTaskDetail(state: State, taskDetail: Task) {
    state.taskDetail = taskDetail;
  },
};
