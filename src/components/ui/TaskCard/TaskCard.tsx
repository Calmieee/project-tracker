import { TaskPriority, TTask } from '../../../types/TTask.ts';
import clsx from 'clsx';

export const TaskCard = ({ task }: { task: TTask }) => (
  <li className={clsx(
    'bg-gray-800 p-3 rounded-lg shadow hover:shadow-md transition-shadow border-l-4',
    task.priority === TaskPriority.HIGH ? 'border-red-500' :
      task.priority === TaskPriority.MEDIUM ? 'border-yellow-500' :
        'border-green-500'
    )}
      >
    <div className="flex justify-between items-start">
      <h3 className="font-medium text-white">{task.title}</h3>
    </div>

    <p className="text-sm text-gray-300 mt-2 line-clamp-2">
      {task.description}
    </p>

    {task.assignee && (
      <div className="flex items-center mt-3">
        <img
          src={task.assignee.avatarUrl}
          alt={task.assignee.fullName}
          className="w-6 h-6 rounded-full mr-2"
        />
        <span className="text-sm text-gray-200">
          {task.assignee.fullName}
        </span>
      </div>
    )}
  </li>
);