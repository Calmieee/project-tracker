import { Navigate, Route, Routes } from 'react-router-dom';
import Issues from '../pages/Issues.tsx';
import Boards from '../pages/Boards.tsx';
import Board from '../pages/Board.tsx';
import NotFound404 from '../pages/NotFound404.tsx';
import Header from './Header.tsx';


const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to='/issues' replace />} />
        <Route path="/issues" element={<Issues />} />
        <Route path='boards' element={<Boards />} />
        <Route path='board/:id' element={<Board />}/>
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;

