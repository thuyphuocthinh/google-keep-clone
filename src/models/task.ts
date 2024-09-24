export interface Task {
  id?: string;
  title: string;
  content: string;
  image?: string | File | undefined;
  backgroundColor?: string;
  timeStart: string;
  timeEnd: string;
  label?: string[];
  labelTitle?: string[];
  remindedAtString?: String;
  remindedAtDate?: Date | null;
  status: string;
  createdBy: string; // creator's id
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: string;
  deleted?: boolean;
  deletedAt?: string;
  deletedBy?: string;
  reminderId: string;
}

export interface TaskStatus {
  id: string;
  code: string;
}

export interface TasksByStatus {
  status: string;
  list: Task[];
}
