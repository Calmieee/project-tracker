import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import Column from './Column.tsx';
import { TaskStatus, TBoardUIProps } from '../../types';
import TaskCard from './TaskCard.tsx';

const BoardUI = (props: TBoardUIProps) => (
  <main className='p-4 m-auto box-border w-10/12'>
    <DndContext
      sensors={props.sensors}
      onDragStart={props.onDragStart}
      onDragEnd={props.onDragEnd}
      onDragOver={props.onDragOver}
    >
      <h1 className='text-2xl font-bold mb-6 text-white'>
        {props.data.data.boardName}
      </h1>
      <div className='flex gap-8 h-[80vh]'>
        <SortableContext items={props.columnsIds}>
          <Column
            status={TaskStatus.BACKLOG}
            tasks={props.columns[TaskStatus.BACKLOG]}
          />
          <Column
            status={TaskStatus.IN_PROGRESS}
            tasks={props.columns[TaskStatus.IN_PROGRESS]}
          />
          <Column
            status={TaskStatus.DONE}
            tasks={props.columns[TaskStatus.DONE]}
          />
        </SortableContext>
      </div>
      {createPortal(
        <DragOverlay>
          {props.activeTask && (
            <TaskCard key={props.activeTask.id} task={props.activeTask} />
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  </main>
);

export default BoardUI;
