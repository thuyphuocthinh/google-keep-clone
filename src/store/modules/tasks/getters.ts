import { STATUS } from "../../../constants";
import { Task } from "../../../models/task";
import { State } from "./state";

export default {
  getAllTasks(state: State): Task[] {
    return state.tasks;
  },
  getTasksTodo(state: State): Task[] {
    return state.tasks.filter((task: Task) => task.status === STATUS.TODO);
  },
  getTasksProgress(state: State): Task[] {
    return state.tasks.filter((task: Task) => task.status === STATUS.PROGRESS);
  },
  getTasksDone(state: State): Task[] {
    return state.tasks.filter((task: Task) => task.status === STATUS.DONE);
  },
};
