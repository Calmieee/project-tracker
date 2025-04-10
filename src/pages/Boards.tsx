// pages/Boards.tsx
import { useQuery } from '@tanstack/react-query';
import { BoardsUI } from '../components/ui/boards/Boards.tsx';
import { getBoards } from '../api/Boards.ts';

const Boards = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['getBoards'],
    queryFn: getBoards,
  });

  return (
    <main className='h-full mt-20'>
      <BoardsUI
        boards={data?.data || []}
        isLoading={isPending}
        isError={isError}
        error={error}
      />
    </main>
  );
};

export default Boards;