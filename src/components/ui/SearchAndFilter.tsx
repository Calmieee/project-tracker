import { Input, Popover } from '@headlessui/react';
import ChevronDown from '../../icons/ChevronDown.tsx';
import Funnel from '../../icons/Funnel.tsx';
import ChevronUp from '../../icons/ChevronUp.tsx';
import FilterPanel from './FilterPanel.tsx';
import { SearchAndFilterProps } from '../../types';

const SearchAndFilter = ({
searchTerm,
setSearchTerm,
statusFilter,
setStatusFilter,
boardFilter,
setBoardFilter,
boards,
}: SearchAndFilterProps) => {
  return (
    <div className="mb-4 flex gap-2">
      <Input
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Поиск по задачам или исполнителям"
        className="flex-1 placeholder:text-gray-300 p-2 border-2 border-gray-700 rounded-md bg-[#1a1a1e] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <div className="relative">
        <Popover className="relative">
          {({ open }) => (
            <div className="absolute left-5">
              <Popover.Button className="inline-flex items-center gap-x-1.5 rounded-md bg-[#1a1a1e] px-3 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-700 hover:bg-gray-800">
                <Funnel />
                Фильтр
                {open ? <ChevronUp /> : <ChevronDown />}
              </Popover.Button>
              <FilterPanel
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                boardFilter={boardFilter}
                setBoardFilter={setBoardFilter}
                boards={boards}
              />
            </div>
          )}
        </Popover>
      </div>
    </div>
  );
};

export default SearchAndFilter;