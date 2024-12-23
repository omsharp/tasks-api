import {
  insertTaskSchema,
  selectTaskSchema,
  updateTaskSchema
} from '@/db/schema/tasks';
import { notFoundSchema } from '@/lib/constants';
import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCode from 'stoker/http-status-codes';
import {
  jsonContent,
  jsonContentOneOf,
  jsonContentRequired
} from 'stoker/openapi/helpers';
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas';

const tags = ['Tasks'];

export const getAll = createRoute({
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

export const create = createRoute({
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
      'Validation error(s)'
    )
  }
});

export const find = createRoute({
  tags,
  path: '/tasks/{id}',
  method: 'get',
  request: {
    params: IdParamsSchema
  },
  responses: {
    [HttpStatusCode.OK]: jsonContent(selectTaskSchema, 'Retrieved task'),
    [HttpStatusCode.NOT_FOUND]: jsonContent(notFoundSchema, 'Task not found'),
    [HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid ID error'
    )
  }
});

export const update = createRoute({
  tags,
  path: '/tasks/{id}',
  method: 'patch',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(updateTaskSchema, 'Update values')
  },
  responses: {
    [HttpStatusCode.OK]: jsonContent(selectTaskSchema, 'The updated task'),
    [HttpStatusCode.NOT_FOUND]: jsonContent(notFoundSchema, 'Task not found'),
    [HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [createErrorSchema(updateTaskSchema), createErrorSchema(IdParamsSchema)],
      'Invalid data error'
    )
  }
});

export const remove = createRoute({
  tags,
  path: '/tasks/{id}',
  method: 'delete',
  request: {
    params: IdParamsSchema
  },
  responses: {
    [HttpStatusCode.NO_CONTENT]: { description: 'Task deleted' },
    [HttpStatusCode.NOT_FOUND]: jsonContent(notFoundSchema, 'Task not found'),
    [HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'invalid ID error'
    )
  }
});

export type TasksListRoute = typeof getAll;
export type CreateTaskRoute = typeof create;
export type GetTaskRoute = typeof find;
export type UpdateTaskRoute = typeof update;
export type DeleteTaskRoute = typeof remove;
