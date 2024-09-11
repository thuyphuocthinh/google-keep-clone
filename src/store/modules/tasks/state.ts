import { Task } from "../../../models/task";

export interface State {
  tasks: Task[];
  taskDetail: Task;
}

export default {
  tasks: [] as Task[],
  taskDetail: {} as Task,
};
