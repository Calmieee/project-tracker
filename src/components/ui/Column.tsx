import { StatusColumnUIProps } from '../../types';
import { SortableContext } from '@dnd-kit/sortable';
import { useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard.tsx';

const ColumnUI = ({ status, tasks }: StatusColumnUIProps) => {
  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const { setNodeRef } = useDroppable({
    id: status,
    data: {
      type: 'column',
      columnStatus: status
    }
  });

  return (
    <div ref={setNodeRef} className='bg-neutral-900 p-4 w-6/12 overflow-y-auto'>
      <h2 className='font-semibold text-lg mb-4 text-white'>
        {status}
        <span className='ml-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full'>
          {tasks.length}
        </span>
      </h2>
      <ul className='flex flex-grow flex-col gap-6 p-1'>
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </ul>
    </div>
  );
};

export default ColumnUI;
