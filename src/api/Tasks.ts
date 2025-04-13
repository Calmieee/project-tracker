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

export const fetchTask = async (taskId: string) => {
  return axios.get(`${URL}/tasks/${taskId}`).then(res => res.data);
};

export const fetchProjects = async () => {
  return axios.get(`${URL}/boards`).then(res => res.data);
};

export const fetchUsers = async () => {
  return axios.get(`${URL}/users`).then(res => res.data);
};

export const createTask = async (data: any) => {
  return axios.post(`${URL}/tasks/create`, data);
};

export const updateTask = async (taskId: string, data: any) => {
  return axios.put(`${URL}/tasks/update/${taskId}`, data);
};

