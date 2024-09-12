import { STATUS } from "../../../constants";
import { Task } from "../../../models/task";
import { State } from "./state";

export default {
  getAllTasks(state: State): Task[] {
    return state.tasks;
  },
  getTasksTodo(state: State): Task[] {
    return state.tasks.filter(
      (task: Task) => task.status === STATUS.TODO && !task.deleted
    );
  },
  getTasksProgress(state: State): Task[] {
    return state.tasks.filter(
      (task: Task) => task.status === STATUS.PROGRESS && !task.deleted
    );
  },
  getTasksDone(state: State): Task[] {
    return state.tasks.filter(
      (task: Task) => task.status === STATUS.DONE && !task.deleted
    );
  },
  getTasksSelected(state: State): number[] {
    return state.tasksSelected;
  },
  getTasksDeleted(state: State): Task[] {
    return state.tasks.filter((task: Task) => task.deleted);
  },
};
