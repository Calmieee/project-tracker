import { TIssues } from '../../types';
import { SkeletonTaskItem, TaskItem } from './index.ts';

interface TaskListProps {
  listRef: React.RefObject<HTMLUListElement | null>;
  tasks: TIssues[];
  isLoadingMore: boolean;
  isEmpty: boolean;
  searchTerm: string;
}

const TaskList = ({
                    listRef,
                    tasks,
                    isLoadingMore,
                    isEmpty,
                    searchTerm,
                  }: TaskListProps) => {
  if (isEmpty) {
    return (
      <div className="text-center py-8 text-gray-400">
        {searchTerm ? 'Задачи не найдены' : 'Нет задач для отображения'}
      </div>
    );
  }

  return (
    <ul
      ref={listRef}
      className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
    >
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
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

export default TaskList;