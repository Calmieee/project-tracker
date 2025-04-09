import { useParams } from 'react-router-dom';

const Board = () => {
  const {id} = useParams();
  return (
    <main>
      Страница доски {id}
    </main>
  );
};

export default Board;