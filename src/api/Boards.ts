import axios from 'axios';
import {URL} from './url.ts';
import { TBoard, TBoardTask } from '../types';


export const getBoards = async () => {
  const res = await axios.get<{ data: TBoard[] }>(`${URL}/boards`);
  return res.data;
}

export const getBoardById = async (id?: string) => {
  if (!id) throw new Error('id обязателен');
  const res = await axios.get<{ data: TBoardTask }>(`${URL}/boards/${id}`);
  return res.data;
}