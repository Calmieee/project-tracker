import {
  DeepRequired,
  FieldErrorsImpl,
  GlobalError,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister
} from 'react-hook-form';
import { TaskSchemaType } from './TaskSchema.ts';
import { RefObject } from 'react';

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

export interface TTask  {
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

export interface TIssues extends TTask {
  boardId: number;
  boardName: string;
}

export interface TaskFormValues {
  title: string;
  description: string;
  project: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignee: string;
}

export interface TaskFormUIProps {
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  isEditMode: boolean;
  onSubmit: SubmitHandler<any>;
  projects: any[];
  users: any[];
  handleToBoard: () => void;
  isButtonActive: boolean;
  isReadyToRender: boolean;
  errors: Partial<FieldErrorsImpl<DeepRequired<TaskSchemaType>>> & {root?: Record<string, GlobalError> & GlobalError};
  isValid: boolean;
  isDirty: boolean;
}

export interface TaskListProps {
  listRef: RefObject<HTMLUListElement | null>;
  tasks: TIssues[];
  isLoadingMore: boolean;
  isEmpty: boolean;
  searchTerm: string;
}


