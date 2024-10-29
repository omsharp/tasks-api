import { createRouter } from '@/lib/routing';
import * as handlers from '@/routes/tasks/tasks.handlers';
import * as routes from '@/routes/tasks/tasks.routes';

const tasksRouter = createRouter()
  .openapi(routes.getAll, handlers.getAll)
  .openapi(routes.create, handlers.create)
  .openapi(routes.find, handlers.find)
  .openapi(routes.update, handlers.update)
  .openapi(routes.remove, handlers.remove);

export default tasksRouter;
