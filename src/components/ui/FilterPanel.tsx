import { Popover } from "@headlessui/react";

interface FilterPanelProps {
  statusFilter: string[];
  setStatusFilter: (value: string[]) => void;
  boardFilter: string[];
  setBoardFilter: (value: string[]) => void;
  boards: string[];
}

const FilterPanel = ({
                       statusFilter,
                       setStatusFilter,
                       boardFilter,
                       setBoardFilter,
                       boards,
                     }: FilterPanelProps) => {
  return (
    <Popover.Panel className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-[#1a1a1e] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-700">
      <div className="py-1 max-h-80 overflow-y-auto">
        <div className="px-3 py-2 text-sm text-gray-400 border-b border-gray-700">
          Статус задачи
        </div>
        {['Backlog', 'InProgress', 'Done'].map((status) => (
          <label
            key={status}
            className="flex items-center px-3 py-2 text-sm text-gray-300 cursor-pointer hover:bg-gray-800 hover:text-white"
          >
            <input
              type="checkbox"
              checked={statusFilter.includes(status)}
              onChange={() =>
                setStatusFilter(
                  statusFilter.includes(status)
                    ? statusFilter.filter((s) => s !== status)
                    : [...statusFilter, status]
                )
              }
              className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 mr-2"
            />
            {status}
          </label>
        ))}

        <div className="px-3 py-2 text-sm text-gray-400 border-b border-gray-700 mt-2">
          Доска
        </div>
        {boards.map((board) => (
          <label
            key={board}
            className="flex items-center px-3 py-2 text-sm text-gray-300 cursor-pointer hover:bg-gray-800 hover:text-white"
          >
            <input
              type="checkbox"
              checked={boardFilter.includes(board)}
              onChange={() =>
                setBoardFilter(
                  boardFilter.includes(board)
                    ? boardFilter.filter((b) => b !== board)
                    : [...boardFilter, board]
                )
              }
              className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 mr-2"
            />
            {board}
          </label>
        ))}

        {(statusFilter.length > 0 || boardFilter.length > 0) && (
          <button
            onClick={() => {
              setStatusFilter([]);
              setBoardFilter([]);
            }}
            className="w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-800"
          >
            Сбросить фильтры
          </button>
        )}
      </div>
    </Popover.Panel>
  );
};

export default FilterPanel;