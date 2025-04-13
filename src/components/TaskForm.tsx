import TaskFormUI from './ui/TaskForm.tsx';
import  useTaskForm  from '../hooks/useTaskForm.ts';

interface TaskFormProps {
  onClose: () => void;
}

const TaskForm = ({ onClose }: TaskFormProps) => {
  const taskFormLogic = useTaskForm(onClose);

  return <TaskFormUI {...taskFormLogic} />;
};

export default TaskForm;
