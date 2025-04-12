import { Navigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getBoardById } from '../api/Boards';
import { useBoardDnD } from '../hooks/useBoardDnD';
import { useDnDSensors } from '../hooks/useDnDSensors.ts';
import { updateTaskStatus } from '../api/Tasks.ts';
import { TaskStatus } from '../types';
import { COLUMSIDS } from '../constants.ts';
import { BoardUI } from '../components/ui';
import { ErrorBoundary } from '../components/ErrorBoundary.tsx';
import { useMemo } from 'react';


const Board = () => {
  const { id } = useParams();
  const sensors = useDnDSensors();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['getBoardById', id],
    queryFn: () => getBoardById(id),
  });

  const { mutate: updateStatus } = useMutation({
    mutationFn: updateTaskStatus
  });

  const tasksByStatus = useMemo(() => ({
    [TaskStatus.BACKLOG]: data?.data.tasks.filter(task => task.status === TaskStatus.BACKLOG) || [],
    [TaskStatus.IN_PROGRESS]: data?.data.tasks.filter(task => task.status === TaskStatus.IN_PROGRESS) || [],
    [TaskStatus.DONE]: data?.data.tasks.filter(task => task.status === TaskStatus.DONE) || [],
  }), [data]);

  const {
    columns,
    activeTask,
    onDragStart,
    onDragEnd,
    onDragOver,
  } = useBoardDnD(tasksByStatus, updateStatus);


  if (!id) return <Navigate to="/*" replace />;
  if (isPending) return <div>Загрузка...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <ErrorBoundary>
      <BoardUI
        columnsIds={COLUMSIDS}
        columns={columns}
        activeTask={activeTask}
        data={data}
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      />
    </ErrorBoundary>
  );
};


export default Board;