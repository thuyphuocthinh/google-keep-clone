import { Task } from "../models/task";

export const searchService = (keyword: string) => {
  const result: Task[] = [];
  const tasksStorage = JSON.parse(localStorage.getItem("tasks") || "");
  for (const task of tasksStorage) {
    if (!task.deleted) {
      const regexSearch = new RegExp(keyword, "i");
      const content: string = task.title + " " + task.content;
      if (regexSearch.test(content)) {
        result.push(task);
      }
    }
  }
  return result;
};
