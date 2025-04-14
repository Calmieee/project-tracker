import { TIssues } from '../../types';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const Issue = ({ task }: { task: TIssues }) => {
  const location = useLocation();

  return (
    <li
      className={clsx(
        'w-full bg-[#1a1a1e]/80 p-4 rounded-md',
        'border-l-4',
        'transition-shadow duration-200 ease-in-out',
        'hover:shadow-[0_4px_12px_rgba(255,255,255,0.1)] hover:bg-[#23232a]',
        task.priority === 'High'
          ? 'border-l-red-500'
          : task.priority === 'Medium'
            ? 'border-l-yellow-500'
            : 'border-l-green-500'
      )}
    >
      <Link
        to={`/issues/edit/${task.id}`}
        state={{
          background: { pathname: location.pathname, search: location.search }
        }}
        className='flex-1 hover:cursor-pointer'
      >
        <div className='flex justify-between items-center'>
          <div className='flex flex-col'>
            <div>
              <h3 className='font-medium text-white'>{task.title}</h3>
              <p className='text-xs text-gray-400 mt-1'>{task.boardName}</p>
            </div>

            <div className='flex items-center gap-2 mt-2'>
              <img
                src={task.assignee.avatarUrl}
                alt={task.assignee.fullName}
                className='w-5 h-5 rounded-full'
              />
              <span className='text-xs text-gray-200'>
                {task.assignee.fullName}
              </span>
            </div>
          </div>
          <span className='text-xs px-2 py-1 bg-gray-700 text-gray-200 rounded-md'>
            {task.status}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default Issue;
