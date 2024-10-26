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
          name: z.string(),
          done: z.boolean()
        })
      ),
      'The list of tasks'
    )
  }
});

export type TasksListRoute = typeof tasksListRoute;
