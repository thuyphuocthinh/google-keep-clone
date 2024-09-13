import { Task } from "../../../models/task";

export interface State {
  tasks: Task[];
  taskDetail: Task;
  tasksSelected: number[];
  tasksSearch: Task[];
}

export default {
  tasks: [] as Task[],
  taskDetail: {} as Task,
  tasksSelected: [] as number[],
  tasksSearch: [] as Task[],
};
