import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './Header.tsx';
import { Board, Boards, Issues, NotFound404 } from '../pages';


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

