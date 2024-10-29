import type { AppRouteHandler } from '@/types';
import type {
  CreateTaskRoute,
  DeleteTaskRoute,
  GetTaskRoute,
  TasksListRoute,
  UpdateTaskRoute
} from './tasks.routes';
import * as HttpStatusCode from 'stoker/http-status-codes';
import {
  deleteTask,
  getAllTasks,
  getTaskById,
  insertTask,
  updateTask
} from '@/data-access/tasks';

export const getAll: AppRouteHandler<TasksListRoute> = async (c) => {
  const tasks = await getAllTasks();
  return c.json(tasks);
};

export const create: AppRouteHandler<CreateTaskRoute> = async (c) => {
  const newTask = c.req.valid('json');
  const insertedTask = await insertTask(newTask);
  return c.json(insertedTask, HttpStatusCode.OK);
};

export const find: AppRouteHandler<GetTaskRoute> = async (c) => {
  const { id } = c.req.valid('param');
  const task = await getTaskById(id);

  if (!task) {
    return c.json({ message: 'Task not found' }, HttpStatusCode.NOT_FOUND);
  }

  return c.json(task, HttpStatusCode.OK);
};

export const update: AppRouteHandler<UpdateTaskRoute> = async (c) => {
  const { id } = c.req.valid('param');
  const values = c.req.valid('json');
  const task = await updateTask(id, values);

  if (!task) {
    return c.json({ message: 'Task not found' }, HttpStatusCode.NOT_FOUND);
  }

  return c.json(task, HttpStatusCode.OK);
};

export const remove: AppRouteHandler<DeleteTaskRoute> = async (c) => {
  const { id } = c.req.valid('param');
  const isDeleted = await deleteTask(id);

  if (!isDeleted) {
    return c.json({ message: 'Task not found' }, HttpStatusCode.NOT_FOUND);
  }

  return c.body(null, HttpStatusCode.NO_CONTENT);
};
