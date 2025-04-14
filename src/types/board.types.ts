import { TaskStatus, TTask } from './task.types.ts';
import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  SensorDescriptor,
  SensorOptions
} from '@dnd-kit/core';

export type TaskColumns = Record<TaskStatus, TTask[]>;

export type TBoard = {
  id: string;
  name: string;
  description: string;
  taskCount: number;
};

export type TBoardTask = {
  boardName: string;
  tasks: TTask[];
};

export type TBoardsUIProps = {
  boards: TBoard[];
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
};

export type TBoardUIProps = {
  columnsIds: string[];
  columns: TaskColumns;
  activeTask: TTask | null;
  data: { data: TBoardTask };
  sensors: SensorDescriptor<SensorOptions>[];
  onDragStart: (event: DragStartEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
  onDragOver: (event: DragOverEvent) => void;
};

export type StatusColumnUIProps = {
  status: TaskStatus;
  tasks: TTask[];
};
