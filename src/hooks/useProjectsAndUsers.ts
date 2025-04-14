import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { URL } from '../api/url';
import { TBoard } from '../types';

export const useProjectsAndUsers = () => {
  const { data: projectData, isPending: isPendingBoards } = useQuery<{
    data: TBoard[];
  }>({
    queryKey: ['projects'],
    queryFn: () => axios.get(`${URL}/boards`).then((res) => res.data)
  });

  const { data: userData, isPending: isPendingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: () => axios.get(`${URL}/users`).then((res) => res.data)
  });

  return {
    projectData,
    userData,
    isPendingBoards,
    isPendingUsers
  };
};
