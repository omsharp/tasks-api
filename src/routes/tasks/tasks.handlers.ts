import type { AppRouteHandler } from '@/types';
import type { TasksListRoute } from './tasks.routes';

export const tasksListHandler: AppRouteHandler<TasksListRoute> = (c) => {
  return c.json([
    {
      name: 'Learning Hono',
      done: false
    }
  ]);
};
