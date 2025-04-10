import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBoardById } from '../api/Boards';
import { TaskStatus } from '../types/TTask';
import { Column } from '../components/ui/Column/Column.tsx';

const Board = () => {
  const { id } = useParams();

  if (!id) return <Navigate to='/*' replace/>;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['getBoardById', id],
    queryFn: () => getBoardById(id),
  });
  if (isPending) return <div>Загрузка...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const tasksByStatus = {
    [TaskStatus.BACKLOG]: data.data.tasks.filter(task => task.status === TaskStatus.BACKLOG),
    [TaskStatus.IN_PROGRESS]: data.data.tasks.filter(task => task.status === TaskStatus.IN_PROGRESS),
    [TaskStatus.DONE]: data.data.tasks.filter(task => task.status === TaskStatus.DONE),
  };

  return (
    <main className="p-4 container mx-auto box-border">
      <h1 className="text-2xl font-bold mb-6 text-white">{data.data.boardName}</h1>
      <div className="flex gap-4 h-[80vh]">
        <Column status={TaskStatus.BACKLOG} tasks={tasksByStatus[TaskStatus.BACKLOG]} />
        <Column status={TaskStatus.IN_PROGRESS} tasks={tasksByStatus[TaskStatus.IN_PROGRESS]} />
        <Column status={TaskStatus.DONE} tasks={tasksByStatus[TaskStatus.DONE]} />
      </div>
    </main>
  );
};

export default Board;