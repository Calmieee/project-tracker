import { useState, useRef, useEffect } from 'react';
import {
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { TaskStatus, TTask } from '../types';

type TaskColumns = Record<TaskStatus, TTask[]>;

export const useBoardDnD = (
  tasks: TaskColumns,
  updateTaskStatus: (params: { taskId: string; status: TaskStatus }) => void
) => {
  const [columns, setColumns] = useState<TaskColumns>(tasks);
  const [activeTask, setActiveTask] = useState<TTask | null>(null);
  const lastUpdateRef = useRef<{ taskId: string; status: TaskStatus } | null>(null);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dragTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setColumns(tasks);
  }, [tasks]);

  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      if (dragTimeoutRef.current) {
        clearTimeout(dragTimeoutRef.current);
      }
    };
  }, []);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'task') {
      setActiveTask(event.active.data.current.task);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over || active.id === over.id) return;

    const activeTask = active.data.current?.task;
    const overTask = over.data.current?.task;

    if (!activeTask || !overTask) return;

    const activeStatus = activeTask.status as TaskStatus;
    const columnTasks = columns[activeStatus];
    const oldIndex = columnTasks.findIndex(t => t.id === active.id);
    const newIndex = columnTasks.findIndex(t => t.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newTaskOrder = arrayMove(columnTasks, oldIndex, newIndex);

      setColumns(prev => ({
        ...prev,
        [activeStatus]: newTaskOrder,
      }));
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!active || !over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (!activeData || !overData) return;
    if (activeData.type !== 'task') return;

    const activeTask = activeData.task as TTask;
    const fromColumn = activeData.columnStatus as TaskStatus;
    const toColumn = (overData.status || overData.columnStatus) as TaskStatus;

    if (!toColumn || fromColumn === toColumn) return;

    dragTimeoutRef.current = setTimeout(() => {
      setColumns((prev) => {
        const sourceTasks = [...prev[fromColumn]];
        const destinationTasks = [...prev[toColumn]];

        const taskIndex = sourceTasks.findIndex((t) => t.id === active.id);
        if (taskIndex === -1) return prev;

        const [movedTask] = sourceTasks.splice(taskIndex, 1);
        movedTask.status = toColumn;

        const overIndex = destinationTasks.findIndex((t) => t.id === over.id);
        if (overIndex === -1) {
          destinationTasks.push(movedTask);
        } else {
          destinationTasks.splice(overIndex, 0, movedTask);
        }

        return {
          ...prev,
          [fromColumn]: sourceTasks,
          [toColumn]: destinationTasks,
        };
      });

      const currentTaskStatus = { taskId: activeTask.id, status: toColumn };
      if (
        !lastUpdateRef.current ||
        lastUpdateRef.current.taskId !== currentTaskStatus.taskId ||
        lastUpdateRef.current.status !== currentTaskStatus.status
      ) {
        lastUpdateRef.current = currentTaskStatus;

        if (updateTimeoutRef.current) {
          clearTimeout(updateTimeoutRef.current);
        }

        updateTimeoutRef.current = setTimeout(() => {
          updateTaskStatus(currentTaskStatus);
        }, 300);
      }
    }, 100);
  };

  return {
    columns,
    activeTask,
    onDragStart,
    onDragEnd,
    onDragOver,
  };
};
