import axios from 'axios';
import { URL } from './url.ts';
import { TaskStatus, TIssues } from '../types';

export type ErrorResponse = {
  error: string;
  message: string;
};

export const updateTaskStatus = async ({
  taskId,
  status
}: {
  taskId: string;
  status: TaskStatus;
}) => {
  const response = await axios.put(`${URL}/tasks/updateStatus/${taskId}`, {
    status
  });
  return response.data;
};

export const fetchTask = async (taskId: string) =>
  axios.get(`${URL}/tasks/${taskId}`).then((res) => res.data);

export const fetchProjects = async () =>
  axios.get(`${URL}/boards`).then((res) => res.data);

export const fetchUsers = async () =>
  axios.get(`${URL}/users`).then((res) => res.data);

export const createTask = async (data: TIssues) =>
  axios.post(`${URL}/tasks/create`, data);

export const updateTask = async (taskId: string, data: TaskStatus) =>
  axios.put(`${URL}/tasks/update/${taskId}`, data);
