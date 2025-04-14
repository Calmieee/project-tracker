import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { TaskFormValues } from '../types';
import { taskSchema, TaskSchemaType } from '../types/TaskSchema';
import { useTaskData } from './useTaskData';
import { useProjectsAndUsers } from './useProjectsAndUsers';
import { useTaskMutation } from './useTaskMutation';
import { LOCAL_STORAGE_KEY } from '../constants.ts';

const useTaskForm = (onClose: () => void) => {
  const { taskData, isPending, editMode, taskId } = useTaskData();
  const { projectData, userData, isPendingBoards, isPendingUsers } =
    useProjectsAndUsers();
  const location = useLocation();
  const navigate = useNavigate();
  const isEditMode = location.pathname.includes('/edit/');
  const backgroundPath = location.state?.background?.pathname;
  const cameFromBoard = backgroundPath?.includes('/board/');
  const isButtonActive = isEditMode && !cameFromBoard;

  const mutation = useTaskMutation({
    isEditMode,
    editMode,
    taskId,
    onSuccessCallback: onClose
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isDirty }
  } = useForm<TaskSchemaType>({
    resolver: zodResolver(taskSchema),
    mode: 'onChange'
  });

  useEffect(() => {
    if (isEditMode && taskData && !isPending && projectData?.data) {
      reset({
        title: taskData.data.title,
        description: taskData.data.description,
        project: taskData.data.boardName,
        priority: taskData.data.priority,
        status: taskData.data.status,
        assignee: taskData.data.assignee?.id
      });
    } else {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        reset(JSON.parse(savedData));
      }
      const subscription = watch((value) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
      });
      return () => subscription.unsubscribe();
    }
  }, [isEditMode, taskData, isPending, projectData, reset, watch]);

  const onSubmit = (data: TaskFormValues) => mutation.mutate(data);

  const handleToBoard = () => {
    if (!isEditMode) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } else {
      navigate(`/issues/edit/${taskData.data.id}`, {
        state: {
          background: { pathname: `/board/${taskData.data.boardId}` }
        }
      });
    }
  };

  const isReadyToRender = isEditMode
    ? !isPending && !!taskData && !isPendingBoards && !isPendingUsers
    : !isPendingBoards && !isPendingUsers;

  return {
    register,
    handleSubmit,
    onSubmit,
    isEditMode,
    isPending,
    isPendingBoards,
    isPendingUsers,
    projects: projectData?.data || [],
    users: userData?.data || [],
    handleToBoard,
    isButtonActive,
    isReadyToRender,
    errors,
    isValid,
    isDirty
  };
};

export default useTaskForm;
