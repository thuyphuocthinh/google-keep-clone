import { Task } from "../../../models/task";

export interface State {
  tasks: Task[];
  taskDetail: Task;
  tasksSelected: number[];
}

export default {
  tasks: [] as Task[],
  taskDetail: {} as Task,
  tasksSelected: [] as number[],
};

