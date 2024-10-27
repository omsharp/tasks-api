import type { AppRouteHandler } from '@/types';
import type {
  CreateTaskRoute,
  GetTaskRoute,
  TasksListRoute
} from './tasks.routes';
import { db } from '@/db';
import { tasks } from '@/db/schema/tasks';
import * as HttpStatusCode from 'stoker/http-status-codes';

export const tasksListHandler: AppRouteHandler<TasksListRoute> = async (c) => {
  const tasks = await db.query.tasks.findMany();
  return c.json(tasks);
};

export const createTaskHandler: AppRouteHandler<CreateTaskRoute> = async (
  c
) => {
  const task = c.req.valid('json');
  const [insertedTask] = await db.insert(tasks).values(task).returning();
  return c.json(insertedTask, HttpStatusCode.OK);
};

export const getTaskHandler: AppRouteHandler<GetTaskRoute> = async (c) => {
  const { id } = c.req.valid('param');
  const task = await db.query.tasks.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    }
  });

  if (!task) {
    return c.json({ message: 'Task not found' }, HttpStatusCode.NOT_FOUND);
  }

  return c.json(task, HttpStatusCode.OK);
};
