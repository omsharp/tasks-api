import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCode from 'stoker/http-status-codes';
import { jsonContent } from 'stoker/openapi/helpers';

const tags = ['Tasks'];

export const tasksListRoute = createRoute({
  tags,
  path: '/tasks',
  method: 'get',
  responses: {
    [HttpStatusCode.OK]: jsonContent(
      z.array(
        z.object({
          id: z.number(),
          title: z.string(),
          done: z.boolean(),
          createdAt: z.date(),
          updatedAt: z.date()
        })
      ),
      'The list of tasks'
    )
  }
});

export type TasksListRoute = typeof tasksListRoute;
