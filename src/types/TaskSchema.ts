import { z } from 'zod';
import { TaskPriority, TaskStatus } from './task.types.ts';

export const taskSchema = z.object({
	title: z.string().min(1, 'Введите название').max(100,'Разрешено не больше 100 символов'),
	description: z.string().min(1, 'Введите описание ').max(500, 'Разрешено не более 500'),
	project: z.string().optional(),
	priority: z.enum([TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH]),
	status: z.enum([TaskStatus.BACKLOG, TaskStatus.IN_PROGRESS, TaskStatus.DONE]),
	assignee: z.union([z.string(), z.number()]).optional(),
});

export type TaskSchemaType = z.infer<typeof taskSchema>;