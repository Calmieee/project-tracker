import ArrowUp from '../../icons/ArrowUp.tsx';

interface ScrollToTopButtonProps {
  show: boolean;
  onClick: () => void;
}

const ScrollToTopButton = ({ show, onClick }: ScrollToTopButtonProps) => {
  if (!show) return null;

  return (
    <button
      onClick={onClick}
      className="fixed right-112 bottom-10 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:cursor-pointer"
    >
      <ArrowUp />
    </button>
  );
};

export default ScrollToTopButton;