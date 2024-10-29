import { createRouter } from '@/lib/routing';
import * as handlers from '@/routes/tasks/tasks.handlers';
import * as routes from '@/routes/tasks/tasks.routes';

const tasksRouter = createRouter()
  .openapi(routes.tasksListRoute, handlers.tasksListHandler)
  .openapi(routes.createTaskRoute, handlers.createTaskHandler)
  .openapi(routes.getTaskRoute, handlers.getTaskHandler)
  .openapi(routes.updateTaskRoute, handlers.updateTaskHandler)
  .openapi(routes.deleteTaskRoute, handlers.deleteTaskHandler);

export default tasksRouter;
