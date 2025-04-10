import { TBoardsUIProps } from "../../../types/TBoardsProps";
import BoardCardUI from '../BoardCard/BoardCard.tsx';

export const BoardsUI = ({ boards, isLoading, isError, error }: TBoardsUIProps) => {
  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка {error?.message}</div>;
  if (!boards.length) return <div>Нет данных</div>;

  return (
    <ul className="flex flex-wrap justify-center h-full gap-9 p-4">
      {boards.map((board) => (
        <BoardCardUI key={board.id} board={board} />
      ))}
    </ul>
  );
};