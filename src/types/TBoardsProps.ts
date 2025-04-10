import { TBoard } from './TBoard.ts';

export type TBoardsUIProps = {
  boards: TBoard[];
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
};