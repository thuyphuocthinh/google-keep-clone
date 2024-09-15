export interface Task {
  id: number;
  title: string;
  content: string;
  image?: string;
  backgroundColor?: string;
  timeStart: string;
  timeEnd: string;
  label?: [];
  status: string;
  createdBy: string; // creator's id
  createdAt: string;
  updatedAt?: string;
  updatedBy?: string;
  deleted: boolean;
  deletedAt?: string;
  deletedBy?: string;
}
