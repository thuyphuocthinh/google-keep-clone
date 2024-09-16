import { Task, TaskStatus, TasksByStatus } from "../../../models/task";
import { State } from "./state";

export default {
  setTasks(state: State, tasks: TasksByStatus[]) {
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

    for (const task of state.tasksDeleted) {
      if (task.id === id) {
        state.showDeletedPermanentIcon = true;
      }
    }
  },
  resetTasksSelected(state: State) {
    state.tasksSelected = [];
  },
  setTasksSearch(state: State, tasks: Task[]) {
    state.tasksSearch = tasks;
  },
  setStatusList(state: State, statusList: TaskStatus[]) {
    state.statusList = statusList;
  },
  setDeletedTask(state: State, tasks: Task[]) {
    state.tasksDeleted = tasks;
  },
  setShowDeletedPermanentIcon(state: State) {
    state.showDeletedPermanentIcon = false;
  },
};
