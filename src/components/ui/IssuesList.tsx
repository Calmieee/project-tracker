import { TaskListProps } from '../../types';
import { SkeletonTaskItem, Issue } from './index';

const IssuesList = ({
  listRef,
  tasks,
  isLoadingMore,
  isEmpty,
  searchTerm
}: TaskListProps) => {
  if (isEmpty) {
    return (
      <div className='text-center py-8 text-gray-400'>
        {searchTerm ? 'Задачи не найдены' : 'Нет задач для отображения'}
      </div>
    );
  }
  return (
    <ul
      ref={listRef}
      className='space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto'
    >
      {tasks.map((task) => (
        <Issue key={task.id} task={task} />
      ))}

      {isLoadingMore && (
        <>
          <SkeletonTaskItem />
          <SkeletonTaskItem />
          <SkeletonTaskItem />
        </>
      )}
    </ul>
  );
};

export default IssuesList;
