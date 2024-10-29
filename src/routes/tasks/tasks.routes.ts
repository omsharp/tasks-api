import { insertTaskSchema, selectTaskSchema } from '@/db/schema/tasks';
import { notFoundSchema } from '@/lib/constants';
import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCode from 'stoker/http-status-codes';
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers';
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas';

const tags = ['Tasks'];

export const tasksListRoute = createRoute({
  tags,
  path: '/tasks',
  method: 'get',
  responses: {
    [HttpStatusCode.OK]: jsonContent(
      z.array(selectTaskSchema),
      'List of all tasks'
    )
  }
});

export const createTaskRoute = createRoute({
  tags,
  path: '/tasks',
  method: 'post',
  request: {
    body: jsonContentRequired(insertTaskSchema, 'Create new task')
  },
  responses: {
    [HttpStatusCode.OK]: jsonContent(selectTaskSchema, 'The created task'),
    [HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTaskSchema),
      'Invalid ID error'
    )
  }
});

export const getTaskRoute = createRoute({
  tags,
  path: '/tasks/{id}',
  method: 'get',
  request: {
    params: IdParamsSchema
  },
  responses: {
    [HttpStatusCode.OK]: jsonContent(selectTaskSchema, 'Retrieved task'),
    [HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Validation error(s)'
    ),
    [HttpStatusCode.NOT_FOUND]: jsonContent(notFoundSchema, 'Task not found')
  }
});

export type TasksListRoute = typeof tasksListRoute;
export type CreateTaskRoute = typeof createTaskRoute;
export type GetTaskRoute = typeof getTaskRoute;
