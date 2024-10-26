import { createRouter } from '@/lib/create-app';
import { createRoute, z } from '@hono/zod-openapi';
import { jsonContent } from 'stoker/openapi/helpers';
import * as HttpStatusCodes from 'stoker/http-status-codes';

const route = createRouter().openapi(
  createRoute({
    tags: ['Index'],
    method: 'get',
    path: '/',
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        z.object({
          message: z.string()
        }),
        'Tasks API Index'
      )
    }
  }),
  (c) => {
    return c.json(
      {
        message: 'Tasks API'
      },
      HttpStatusCodes.OK
    );
  }
);

export default route;
