import Flag from '../assets/icons/Flag.tsx';
import { Link } from 'react-router-dom';

const NotFound404 = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center gap-20'>
      <Flag/>
      <h1 className='
        text-4xl font-bold flex flex-col
        items-center justify-center'
      >
        Возможно такой страницы не существует
      </h1>
      <Link to='/issues' className='
      bg-columnBackgroundColor
       p-4 rounded-lg border-2 border-transparent
        text-white outline-none hover:border-rose-500'
      >
        Вернуться на домашнюю страницу
      </Link>
    </div>
  );
};

export default NotFound404;