import { useState, useEffect, useCallback, RefObject } from 'react';

export const useScrollManagement = <T extends HTMLElement>(
  listRef: RefObject<T | null>,
  visibleTasks: number,
  filterTasksLength: number,
  isLoadingMore: boolean,
  loadMoreTasks: () => void
) => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToTop = useCallback(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [listRef]);

  useEffect(() => {
    const listElement = listRef.current;
    if (!listElement) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = listElement;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;

      setShowScrollButton(scrollTop > 300);

      if (isNearBottom && visibleTasks < filterTasksLength && !isLoadingMore) {
        loadMoreTasks();
      }
    };

    listElement.addEventListener('scroll', handleScroll);
    return () => listElement.removeEventListener('scroll', handleScroll);
  }, [visibleTasks, filterTasksLength, isLoadingMore, loadMoreTasks, listRef]);

  return {
    showScrollButton,
    scrollToTop
  };
};
