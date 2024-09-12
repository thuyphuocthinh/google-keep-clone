import { Task } from "../models/task";

export const createNewTaskService = (task: Task) => {
  const tasksStorage = JSON.parse(localStorage.getItem("tasks") || "");
  tasksStorage.push(task);
  tasksStorage.sort((a: Task, b: Task) => {
    if (a.createdAt > b.createdAt) return -1;
    else if (a.createdAt < b.createdAt) return 1;
    return 0;
  });
  localStorage.setItem("tasks", JSON.stringify(tasksStorage));
};

export const getTaskDetailService = (id: number): Task => {
  const tasksStorage = JSON.parse(localStorage.getItem("tasks") || "");
  const task: Task = tasksStorage.find((task: Task) => task.id === id);
  return task;
};

export const deleteTaskService = (id: number): void => {
  let tasksStorage = JSON.parse(localStorage.getItem("tasks") || "");
  const findIndex = tasksStorage.findIndex((task: Task) => task.id === id);
  tasksStorage[findIndex].deleted = true;
  tasksStorage.sort((a: Task, b: Task) => {
    if (a.createdAt > b.createdAt) return -1;
    else if (a.createdAt < b.createdAt) return 1;
    return 0;
  });
  localStorage.setItem("tasks", JSON.stringify(tasksStorage));
};

export const updateTaskService = (taskUpdate: Task): void => {
  const id: number = taskUpdate.id;
  const tasksStorage = JSON.parse(localStorage.getItem("tasks") || "");
  const findIndex: number = tasksStorage.findIndex(
    (task: Task) => task.id === id
  );
  if (findIndex !== -1) {
    tasksStorage[findIndex] = taskUpdate;
  }
  tasksStorage.sort((a: Task, b: Task) => {
    if (a.createdAt > b.createdAt) return -1;
    else if (a.createdAt < b.createdAt) return 1;
    return 0;
  });
  localStorage.setItem("tasks", JSON.stringify(tasksStorage));
};

export const changeTaskStatusService = (
  id: number,
  oldStatus: string,
  newStatus: string
): void => {
  const tasksStorage = JSON.parse(localStorage.getItem("tasks") || "");
  const findIndex: number = tasksStorage.findIndex(
    (task: Task) => task.id === id && task.status === oldStatus
  );
  if (findIndex !== -1) {
    tasksStorage[findIndex].status = newStatus;
  }
  tasksStorage.sort((a: Task, b: Task) => {
    if (a.createdAt > b.createdAt) return -1;
    else if (a.createdAt < b.createdAt) return 1;
    return 0;
  });
  localStorage.setItem("tasks", JSON.stringify(tasksStorage));
};

export const deleteMultipleTasksService = (tasks: number[]): void => {
  const tasksStorage = JSON.parse(localStorage.getItem("tasks") || "");
  tasks.forEach((id: number) => {
    const findIndex = tasksStorage.findIndex((task: Task) => task.id === id);
    tasksStorage[findIndex].deleted = true;
  });
  tasksStorage.sort((a: Task, b: Task) => {
    if (a.createdAt > b.createdAt) return -1;
    else if (a.createdAt < b.createdAt) return 1;
    return 0;
  });
  localStorage.setItem("tasks", JSON.stringify(tasksStorage));
};

export const deleteTaskPermanentlyService = (id: number) => {
  let tasksStorage = JSON.parse(localStorage.getItem("tasks") || "");
  tasksStorage = tasksStorage.filter((task: Task) => task.id !== id);
  tasksStorage.sort((a: Task, b: Task) => {
    if (a.createdAt > b.createdAt) return -1;
    else if (a.createdAt < b.createdAt) return 1;
    return 0;
  });
  localStorage.setItem("tasks", JSON.stringify(tasksStorage));
};

export const recoverTaskService = (id: number) => {
  let tasksStorage = JSON.parse(localStorage.getItem("tasks") || "");
  const findIndex = tasksStorage.findIndex((task: Task) => task.id === id);
  tasksStorage[findIndex].deleted = false;
  tasksStorage.sort((a: Task, b: Task) => {
    if (a.createdAt > b.createdAt) return -1;
    else if (a.createdAt < b.createdAt) return 1;
    return 0;
  });
  localStorage.setItem("tasks", JSON.stringify(tasksStorage));
};
