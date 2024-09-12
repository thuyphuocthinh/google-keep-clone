import { Task } from "../../../models/task";
import { State } from "./state";

export default {
  setTasks(state: State, tasks: Task[]) {
    state.tasks = tasks;
  },
  setTaskDetail(state: State, taskDetail: Task) {
    state.taskDetail = taskDetail;
  },
  setTasksSelected(state: State, id: number) {
    const findIndex = state.tasksSelected.findIndex(
      (item: number) => item === id
    );
    if (findIndex !== -1) {
      state.tasksSelected.splice(findIndex, 1);
    } else {
      state.tasksSelected.push(id);
    }
  },
  resetTasksSelected(state: State) {
    state.tasksSelected = [];
  },
};
