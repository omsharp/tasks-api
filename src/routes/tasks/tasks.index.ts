import { createRouter } from '@/lib/create-app';
import * as handlers from '@/routes/tasks/tasks.handlers';
import * as routes from '@/routes/tasks/tasks.routes';

const tasksRouter = createRouter()
  .openapi(routes.tasksListRoute, handlers.tasksListHandler)
  .openapi(routes.createTaskRoute, handlers.createTaskHandler)
  .openapi(routes.getTaskRoute, handlers.getTaskHandler);

export default tasksRouter;
