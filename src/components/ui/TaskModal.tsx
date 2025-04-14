import { Dialog } from '@headlessui/react';
import TaskForm from '../TaskForm';
import { TaskModalProps } from '../../types';

const TaskModal = ({ onClose }: TaskModalProps) => (
  <Dialog open onClose={onClose} className='relative z-50'>
    <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
    <div className='fixed inset-0 flex items-center justify-center p-4'>
      <Dialog.Panel className='w-full max-w-md rounded bg-gray-800 p-6 text-white'>
        <TaskForm onClose={onClose} />
      </Dialog.Panel>
    </div>
  </Dialog>
);

export default TaskModal;
