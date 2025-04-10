import { TaskStatus, TTask } from '../../../types/TTask.ts';
import { TaskCard } from '../TaskCard/TaskCard.tsx';

type StatusColumnProps = {
  status: TaskStatus;
  tasks: TTask[];
};

const statusTitles = {
  [TaskStatus.BACKLOG]: 'Backlog',
  [TaskStatus.IN_PROGRESS]: 'In Progress',
  [TaskStatus.DONE]: 'Done'
};

export const Column = ({ status, tasks }: StatusColumnProps) => (
  <div className="bg-columnBackgroundColor rounded-lg p-4 flex-1 min-w-[280px] h-full overflow-y-auto">
    <h2 className="font-semibold text-lg mb-4 text-gray-800 dark:text-white">
      {statusTitles[status]}
      <span className="ml-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full">
        {tasks.length}
      </span>
    </h2>
    <ul className="space-y-3">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </ul>
  </div>
);