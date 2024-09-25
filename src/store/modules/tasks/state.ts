import { Task, TaskStatus, TasksByStatus } from "../../../models/task";

export interface State {
  tasks: TasksByStatus[];
  taskDetail: Task;
  tasksSelected: string[];
  tasksSearch: Task[];
  statusList: TaskStatus[];
  showDeletedPermanentIcon: Boolean;
  tasksDeleted: Task[];
  taskImage: File;
  taskReminded: Task[];
}

export default {
  tasks: [] as Task[],
  taskDetail: {} as Task,
  tasksSelected: [] as number[],
  tasksSearch: [] as Task[],
  statusList: [] as TaskStatus[],
  showDeletedPermanentIcon: false,
  tasksDeleted: [] as Task[],
  taskImage: File,
  taskReminded: [] as Task[],
};
