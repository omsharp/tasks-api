import { createApp } from '@/lib/create-app.js';
import configureOpenAPI from './lib/openAPI';
import indextRoute from '@/routes/index.route';
import tasksRoute from '@/routes/tasks/tasks.index';

const app = createApp();

const routes = [indextRoute, tasksRoute];

configureOpenAPI(app);

routes.forEach((route) => {
  app.route('/', route);
});

export default app;
