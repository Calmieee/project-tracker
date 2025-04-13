import { Link, useLocation } from 'react-router-dom';
import Pencil from '../../icons/Pencil.tsx';
import clsx from 'clsx';
import { FC } from 'react';
import { HeaderProps } from '../../types';


const HeaderUI: FC<HeaderProps> = ({ isActive }) => {
  const location = useLocation();
  return (
    <nav className='p-6 bg-[#1c1c21] flex justify-between text-3xl text-gray-300'>
      <div className='flex gap-10'>
        <Link
          to='/issues'
          className={clsx(
            'relative pb-1 group hover:text-white transition-colors',
            isActive('/issues') && 'text-white'
          )}
          aria-current={isActive('/issues') ? 'page' : undefined}
        >
          Все задачи
          <span className={clsx(
            'absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300',
            isActive('/issues') ? 'w-full' : 'w-0 group-hover:w-full'
          )} />
        </Link>
        <Link
          to='/boards'
          className={clsx(
            'relative pb-1 group hover:text-white transition-colors',
            isActive('/boards') && 'text-white'
          )}
          aria-current={isActive('/boards') ? 'page' : undefined}
        >
          Проекты
          <span className={clsx(
            'absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300',
            isActive('/boards') ? 'w-full' : 'w-0 group-hover:w-full'
          )} />
        </Link>
      </div>
      <Link
        to='/issues/create'
        state={{ background: { pathname: location.pathname, search: location.search } }}
        className='
          justify-self-end flex items-end justify-center gap-2
          relative pb-1 group hover:cursor-pointer hover:text-white transition-colors'
      >
        Создать задачу
        <Pencil />
        <span className="absolute bottom-0 left-0 w-0 h-0.5
         bg-white transition-all duration-300 group-hover:w-full" />
      </Link>
    </nav>
  );
};

export default HeaderUI;