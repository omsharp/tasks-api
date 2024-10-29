import type { AppRouteHandler } from '@/types';
import type {
  CreateTaskRoute,
  GetTaskRoute,
  TasksListRoute
} from './tasks.routes';
import * as HttpStatusCode from 'stoker/http-status-codes';
import { getAllTasks, getTaskById, insertTask } from '@/data-access/tasks';

export const tasksListHandler: AppRouteHandler<TasksListRoute> = async (c) => {
  const tasks = await getAllTasks();
  return c.json(tasks);
};

export const createTaskHandler: AppRouteHandler<CreateTaskRoute> = async (
  c
) => {
  const newTask = c.req.valid('json');
  const insertedTask = await insertTask(newTask);
  return c.json(insertedTask, HttpStatusCode.OK);
};

export const getTaskHandler: AppRouteHandler<GetTaskRoute> = async (c) => {
  const { id } = c.req.valid('param');
  const task = await getTaskById(id);

  if (!task) {
    return c.json({ message: 'Task not found' }, HttpStatusCode.NOT_FOUND);
  }

  return c.json(task, HttpStatusCode.OK);
};
