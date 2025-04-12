import { useRef } from 'react';
import { useIssuesData } from '../hooks/useIssuesData';
import { useIssuesFilter } from '../hooks/useIssuesFilter';
import { useScrollManagement } from '../hooks/useScrollManagement';
import { ScrollToTopButton, SearchAndFilter, SkeletonTaskItem, TaskList } from '../components/ui';

const Issues = () => {
  const { data, isPending, isError, error } = useIssuesData();
  const listRef = useRef<HTMLUListElement>(null);

  const {
    searchTerm,
    setSearchTerm,
    isLoadingMore,
    statusFilter,
    setStatusFilter,
    boardFilter,
    setBoardFilter,
    boards,
    filterTasks,
    visibleTasksList,
    loadMoreTasks,
  } = useIssuesFilter(data);

  const { showScrollButton, scrollToTop } = useScrollManagement(
    listRef,
    visibleTasksList.length,
    filterTasks.length,
    isLoadingMore,
    loadMoreTasks
  );

  if (isPending) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <div className="mb-4">
          <div className="w-full h-10 bg-gray-700 rounded-md animate-pulse"></div>
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <SkeletonTaskItem key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 max-w-4xl mx-auto text-red-500">
        Ошибка {error.message}
      </div>
    );
  }

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        boardFilter={boardFilter}
        setBoardFilter={setBoardFilter}
        boards={boards}
      />
      <TaskList
        listRef={listRef}
        tasks={visibleTasksList}
        isLoadingMore={isLoadingMore}
        isEmpty={filterTasks.length === 0}
        searchTerm={searchTerm}
      />
      <ScrollToTopButton show={showScrollButton} onClick={scrollToTop} />
      <button className='
        absolute bottom-9
        right-20 text-3xl
        border-2 border-transparent
        p-2 rounded-md bg-blue-900
       text-gray-200
       transition-colors duration-150 ease-in-out
        hover:cursor-pointer hover:bg-blue-800
      '>
        Создать задачу
      </button>
    </main>
  );
};

export default Issues;