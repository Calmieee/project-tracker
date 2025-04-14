import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { URL } from '../api/url';

export const useTaskData = () => {
  const { taskId } = useParams();
  const editMode = !!taskId;

  const { data, isPending } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => axios.get(`${URL}/tasks/${taskId}`).then((res) => res.data),
    enabled: editMode
  });

  return { taskData: data, isPending, editMode, taskId };
};
