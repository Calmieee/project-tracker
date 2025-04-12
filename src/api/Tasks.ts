import axios from 'axios';
import {URL} from './url.ts'
import { TaskStatus } from '../types';

export type ErrorResponse = {
  error: string;
  message: string;
};

export const updateTaskStatus = async ({ taskId, status }: { taskId: string; status: TaskStatus }) => {
  const response = await axios.put(`${URL}/tasks/updateStatus/${taskId}`, { status });
  return response.data;
};
