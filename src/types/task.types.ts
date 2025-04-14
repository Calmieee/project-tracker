import {
  DeepRequired,
  FieldErrorsImpl,
  GlobalError,
  UseFormHandleSubmit,
  UseFormRegister
} from 'react-hook-form';
import { TaskSchemaType } from './TaskSchema.ts';
import { RefObject } from 'react';
import { TBoard } from './board.types.ts';
import { TUser } from './global.types.ts';

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

export interface TTask {
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
  };
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
  register: UseFormRegister<TaskSchemaType>;
  handleSubmit: UseFormHandleSubmit<TaskFormValues>;
  isEditMode: boolean;
  onSubmit: (data: TaskFormValues) => void;
  projects: TBoard[];
  users: TUser[];
  handleToBoard: () => void;
  isButtonActive: boolean;
  isReadyToRender: boolean;
  errors: Partial<FieldErrorsImpl<DeepRequired<TaskSchemaType>>> & {
    root?: Record<string, GlobalError> & GlobalError;
  };
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
