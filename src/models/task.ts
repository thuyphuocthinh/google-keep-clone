export interface Task {
  id?: string;
  title: string;
  content: string;
  image?: string;
  backgroundColor?: string;
  timeStart: string;
  timeEnd: string;
  label?: string[];
  labelTitle?: string[];
  status: string;
  createdBy: string; // creator's id
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: string;
  deleted?: boolean;
  deletedAt?: string;
  deletedBy?: string;
}

export interface TaskStatus {
  id: string;
  code: string;
}

export interface TasksByStatus {
  status: string;
  list: Task[];
}
