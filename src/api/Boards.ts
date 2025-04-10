import axios from 'axios';
import {URL} from './url.ts';
import { TBoard } from '../types/TBoard.ts';
import { TTask } from '../types/TTask.ts';

export const getBoards = async () => {
  const res = await axios.get<{ data: TBoard[] }>(`${URL}/boards`);
  return res.data;
}

export const getBoardById = async (id: string) => {
  const res = await axios.get<{ data: TTask[] }>(`${URL}/boards/${id}`);
  return res.data;
}