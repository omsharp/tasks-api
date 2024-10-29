import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares';
import { pinoLogger } from '@/middlewares/pino-logger.js';
import configureOpenAPI from './lib/openAPI';
import indexRoute from '@/routes/index.route';
import tasksRoute from '@/routes/tasks/tasks.index';
import { createRouter } from './lib/routing';

const routes = [indexRoute, tasksRoute];

const app = createRouter();
app.use(serveEmojiFavicon('📝'));
app.use(pinoLogger());
app.notFound(notFound);
app.onError(onError);

configureOpenAPI(app);

routes.forEach((route) => {
  app.route('/', route);
});

export default app;
