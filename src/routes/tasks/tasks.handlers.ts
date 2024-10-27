import type { AppRouteHandler } from '@/types';
import type { TasksListRoute } from './tasks.routes';
import { db } from '@/db';

export const tasksListHandler: AppRouteHandler<TasksListRoute> = async (c) => {
  const tasks = await db.query.tasks.findMany();
  return c.json(tasks);
};
