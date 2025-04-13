import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { URL } from '../api/url';
import { TaskFormValues } from '../types';

export const useTaskMutation = ({
isEditMode,
editMode,
taskId,
onSuccessCallback,
}: {
	isEditMode: boolean;
	editMode: boolean;
	taskId?: string;
	onSuccessCallback: () => void;
}) => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (data: TaskFormValues) => {
			const payload = {
				title: data.title,
				description: data.description,
				priority: data.priority,
				status: data.status,
				assigneeId: Number(data.assignee),
				...(isEditMode ? {} : { boardId: Number(data.project) }),
			};

			return editMode
				? axios.put(`${URL}/tasks/update/${taskId}`, payload)
				: axios.post(`${URL}/tasks/create`, payload);
		},
		onSuccess: () => {
			if (!isEditMode) {
				localStorage.removeItem('taskFormDraft');
			}
			queryClient.invalidateQueries({ queryKey: ['getIssues'] });
			queryClient.invalidateQueries({ queryKey: ['getBoardById'] });
			onSuccessCallback();
		}
	});

	return mutation;
};
