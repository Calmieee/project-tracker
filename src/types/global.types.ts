import { TaskStatus, TTask } from './task.types';

export interface ScrollToTopButtonProps {
  show: boolean;
  onClick: () => void;
}

export interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string[];
  setStatusFilter: (value: string[]) => void;
  boardFilter: string[];
  setBoardFilter: (value: string[]) => void;
  boards: string[];
}

export interface FilterPanelProps {
  statusFilter: string[];
  setStatusFilter: (value: string[]) => void;
  boardFilter: string[];
  setBoardFilter: (value: string[]) => void;
  boards: string[];
}

export interface TUser {
  avatarUrl: 'string';
  description: 'string';
  email: 'string';
  fullName: 'string';
  id: number;
  tasksCount: number;
  teamId: number;
  teamName: 'string';
}

export type TaskColumns = Record<TaskStatus, TTask[]>;
