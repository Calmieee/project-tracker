import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useDebounce } from './useDebounce.tsx';
import { TIssues } from '../types';

export const useIssuesFilter = (data: {data: TIssues[]} | undefined) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleTasks, setVisibleTasks] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [boardFilter, setBoardFilter] = useState<string[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const boards = useMemo(() => {
    if (!data?.data) return [];
    const boardsSet = new Set<string>();
    data.data.forEach((task) => boardsSet.add(task.boardName));
    return Array.from(boardsSet);
  }, [data]);

  const filterTasks = useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter((task: any) => {
      const searchLower = debouncedSearchTerm.toLowerCase();
      const titleMatch = task.title.toLowerCase().includes(searchLower);
      const assigneeMatch = task.assignee?.fullName.toLowerCase().includes(searchLower);
      const searchMatch = titleMatch || assigneeMatch;
      const statusMatch = statusFilter.length === 0 || statusFilter.includes(task.status);
      const boardMatch = boardFilter.length === 0 || boardFilter.includes(task.boardName);

      return searchMatch && statusMatch && boardMatch;
    });
  }, [data, debouncedSearchTerm, statusFilter, boardFilter]);

  const visibleTasksList = useMemo(() => {
    return filterTasks.slice(0, visibleTasks);
  }, [filterTasks, visibleTasks]);

  const loadMoreTasks = useCallback(() => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    setIsLoadingMore(true);

    loadingTimeoutRef.current = setTimeout(() => {
      setVisibleTasks(prev => Math.min(prev + 10, filterTasks.length));
      setIsLoadingMore(false);
    }, 1000);
  }, [filterTasks.length]);

  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    visibleTasks,
    isLoadingMore,
    statusFilter,
    setStatusFilter,
    boardFilter,
    setBoardFilter,
    boards,
    filterTasks,
    visibleTasksList,
    loadMoreTasks,
    loadingTimeoutRef
  };
};