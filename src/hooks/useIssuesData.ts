import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { URL } from '../api/url';
import { TIssues } from '../types';

export const useIssuesData = () => {
  return useQuery<{data: TIssues[]}>({
    queryKey: ['getIssues'],
    queryFn: async () => {
      const res = await axios.get(`${URL}/tasks`);
      return res.data;
    }
  });
};