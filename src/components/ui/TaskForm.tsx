import clsx from 'clsx';
import { TaskFormUIProps, TaskPriority, TaskStatus } from '../../types';

const TaskFormUI = ({
  register,
  handleSubmit,
  isEditMode,
  onSubmit,
  projects,
  users,
  handleToBoard,
  isButtonActive,
  isReadyToRender,
  errors,
  isValid,
  isDirty, }: TaskFormUIProps) => {
  if (!isReadyToRender) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 id="form-title">{isEditMode ? 'Редактирование' : 'Создание'} задачи</h2>
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">Название</label>
        <input
          id="title"
          type="text"
          {...register('title', { required: true })}
          className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Введите название"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">
            {errors.title.message}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">Описание</label>
        <textarea
          id="description"
          {...register('description')}
          rows={3}
          className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Добавьте описание"
        />
        {errors.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="project" className="block text-sm font-medium mb-1">Проект</label>
        <select
          id="project"
          {...register('project', { required: true })}
          disabled={isEditMode}
          className={clsx('w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500',
            isEditMode ? 'bg-transparent border hover:cursor-not-allowed border-gray-500 text-gray-500' : 'bg-gray-700 hover:cursor-pointer'
          )}
        >
          {projects.map((project) => (
            <option key={project.id} value={isEditMode ? project.name : project.id}>
              {project.name}
            </option>
          ))}
        </select>
        {errors.project && (
          <span className="text-red-500 text-sm">
            {errors.project.message}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="priority" className="block text-sm font-medium mb-1">Приоритет</label>
        <select
          id="priority"
          {...register('priority', { required: true })}
          className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none hover:cursor-pointer focus:ring-2 focus:ring-blue-500"
        >
          <option value={TaskPriority.LOW}>Низкий</option>
          <option value={TaskPriority.MEDIUM}>Средний</option>
          <option value={TaskPriority.HIGH}>Высокий</option>
        </select>
        {errors.priority && (
          <span className="text-red-500 text-sm">
            {errors.priority.message}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium mb-1">Статус</label>
        <select
          id="status"
          {...register('status', { required: true })}
          disabled={!isEditMode}
          className={clsx('w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500',
            !isEditMode
              ? 'bg-transparent border hover:cursor-not-allowed border-gray-500 text-gray-500'
              : 'bg-gray-700 hover:cursor-pointer'
          )}
        >
          <option value={TaskStatus.BACKLOG}>{TaskStatus.BACKLOG}</option>
          <option value={TaskStatus.IN_PROGRESS}>{TaskStatus.IN_PROGRESS}</option>
          <option value={TaskStatus.DONE}>{TaskStatus.DONE}</option>
        </select>
        {errors.status && (
          <span className="text-red-500 text-sm">
            {errors.status.message}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="assignee" className="block text-sm font-medium mb-1"
        >
          Исполнитель
        </label>
        <select
          id="assignee"
          {...register('assignee')}
          className="w-full px-3 py-2 bg-gray-700 hover:cursor-pointer
           rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.fullName}</option>
          ))}
        </select>
        {errors.status && (
          <span className="text-red-500 text-sm">
            {errors.status.message}
          </span>
        )}
      </div>
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={handleToBoard}
          disabled={!isButtonActive}
          className={clsx("px-4 py-2 hover:cursor-pointer rounded",
            !isButtonActive ? "invisible" : "bg-gray-600 hover:bg-gray-500")}
        >
          Перейти на доску
        </button>
        <button
          type="submit"
          disabled={isEditMode ? !(isValid && isDirty) : !isValid}
          className="
            px-4 py-2 bg-blue-600 hover:cursor-pointer
            hover:bg-blue-500 rounded disabled:bg-transparent
            border-1 border-transparent disabled:border-gray-500
            disabled:text-gray-500
          ">
          {isEditMode ? 'Обновить' : 'Создать'}
        </button>
      </div>
    </form>
  );
};

export default TaskFormUI;
