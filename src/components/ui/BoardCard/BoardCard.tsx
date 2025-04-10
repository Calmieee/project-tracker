import { Link } from 'react-router-dom';
import { TBoard } from '../../../types/TBoard.ts';

const BoardCardUI = ({ board }: { board: TBoard }) => (
  <li className="w-[30%]">
    <Link
      to={`/board/${board.id}`}
      className="
        p-4 rounded-lg shadow-md bg-[#1c1c21] border-2
        border-transparent flex flex-col justify-between gap-8
        transition-all duration-300 ease-out
        hover:cursor-pointer hover:border-white
        hover:scale-[1.02] hover:shadow-lg
        group will-change-transform h-full
      "
    >
      <div className="flex flex-col">
        <div className="relative w-fit">
          <h3 className="
            font-bold text-2xl pb-1
            transition-colors duration-200 ease-out
            group-hover:text-white w-fit
          ">
            {board.name}
            <span className="
              absolute bottom-0 left-0 h-0.5 bg-white
              transition-all duration-300 ease-out
              w-0 group-hover:w-full
            " />
          </h3>
        </div>
        <p className="text-gray-400 transition-colors duration-200 ease-out group-hover:text-gray-300">
          {board.description}
        </p>
      </div>
      <p className="text-gray-400 transition-colors duration-200 ease-out group-hover:text-gray-300">
        Задач: {board.taskCount}
      </p>
    </Link>
  </li>
);

export default BoardCardUI;