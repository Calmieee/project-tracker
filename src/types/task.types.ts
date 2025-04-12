export enum TaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export enum TaskStatus {
  BACKLOG = 'Backlog',
  IN_PROGRESS = 'InProgress',
  DONE = 'Done'
}

export type TTask = {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignee: {
    id: string;
    fullName: string;
    email: string;
    avatarUrl: string;
  }
}