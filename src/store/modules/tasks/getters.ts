import { Task, TaskStatus, TasksByStatus } from "../../../models/task";
import { State } from "./state";

export default {
  getAllTasks(state: State): TasksByStatus[] {
    return state.tasks;
  },
  // getTasksTodo(state: State): Task[] {
  //   return state.tasks.filter(
  //     (task: Task) => task.status === STATUS.TODO && !task.deleted
  //   );
  // },
  // getTasksProgress(state: State): Task[] {
  //   return state.tasks.filter(
  //     (task: Task) => task.status === STATUS.PROGRESS && !task.deleted
  //   );
  // },
  // getTasksDone(state: State): Task[] {
  //   return state.tasks.filter(
  //     (task: Task) => task.status === STATUS.DONE && !task.deleted
  //   );
  // },
  getTasksSelected(state: State): string[] {
    return state.tasksSelected;
  },
  getTasksDeleted(state: State): Task[] {
    return state.tasksDeleted;
  },
  getTasksSearch(state: State): Task[] {
    return state.tasksSearch;
  },
  getStatusList(state: State): TaskStatus[] {
    return state.statusList;
  },
  showDeletedPermanentIcon(state: State) {
    return state.showDeletedPermanentIcon;
  },
  getTaskImage(state: State) {
    return state.taskImage;
  },
  getTaskReminded(state: State) {
    return state.taskReminded;
  }
};
