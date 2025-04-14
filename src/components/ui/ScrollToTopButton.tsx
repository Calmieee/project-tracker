import ArrowUp from '../../icons/ArrowUp.tsx';
import { ScrollToTopButtonProps } from '../../types';

const ScrollToTopButton = ({ show, onClick }: ScrollToTopButtonProps) => {
  if (!show) return null;

  return (
    <button
      onClick={onClick}
      className='
        fixed right-55 bottom-35 p-3
      bg-blue-600 hover:bg-blue-700
          text-white rounded-full shadow-lg
         transition-all duration-300
          hover:scale-110 hover:cursor-pointer
      '
    >
      <ArrowUp />
    </button>
  );
};

export default ScrollToTopButton;
