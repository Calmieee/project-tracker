import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './Header.tsx';
import { Board, Boards, Issues, NotFound404 } from '../pages';
import TaskModal from './ui/TaskModal.tsx';


const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  return (
    <div>
      <Header />
      <Routes location={background || location}>
        <Route path="/" element={<Navigate to="/boards" replace />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/board/:id" element={<Board />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/issues/create" element={<TaskModal onClose={() => navigate(background.pathname)} />} />
          <Route path="/issues/edit/:taskId" element={<TaskModal onClose={() => navigate(background.pathname)} />} />
        </Routes>
      )}
    </div>
  );
};

export default App;