import { TaskPriority, TTask} from '../../types/';
import clsx from 'clsx';
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

const TaskCardUI = ({ task }: { task: TTask }) => {
  const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
    id: task.id,
    data: {
      type: 'task',
      task,
      columnStatus: task.status
    },
  })
  const style = {
    transition: transition,
    transform: CSS.Transform.toString(transform),
  }
  if (isDragging) {
    return <div ref={setNodeRef} style={style} className='
    bg-gray-900 p-3 rounded-lg hover:cursor-grab
      w-full
      min-h-[155px]
      h-1/5
      opacity-50
      border-2
      border-dashed
      border-rose-500
      '/>

  }

  return (
    <div ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
         className={clsx(
           'w-full min-h-[155px] bg-gray-900 p-3 rounded-lg',
           'border-4 border-transparent border-l-4 flex flex-col justify-between',
           'transition-shadow transition-colors duration-200 ease-in-out hover:cursor-grab',
           !isDragging && 'hover:shadow-[0_4px_12px_rgba(255,255,255,0.1)] hover:bg-[#23232a]', // темный оттенок
           task.priority === TaskPriority.HIGH ? 'border-l-red-500 hover:border-l-red-500' :
             task.priority === TaskPriority.MEDIUM ? 'border-l-yellow-500 hover:border-l-yellow-500' :
               'border-l-green-500 hover:border-l-green-500'
         )}



    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-white">{task.title}</h3>
      </div>

      <p className="text-sm text-gray-300">
        {task.description}
      </p>

      {task.assignee && (
        <div className="flex items-center">
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
    </div>
  );
}

export default TaskCardUI;