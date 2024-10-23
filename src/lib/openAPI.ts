import type { AppOpenAPI } from '@/types';
import packageJSON from '../../package.json';
import { apiReference } from '@scalar/hono-api-reference';

export default function configureOpenAPI(app: AppOpenAPI) {
  // The OpenAPI documentation will be available at /doc
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'Tasks API'
    }
  });

  app.get(
    '/reference',
    apiReference({
      theme: 'kepler',
      layout: 'classic',
      defaultHttpClient: {
        targetKey: 'javascript',
        clientKey: 'fetch'
      },
      spec: {
        url: '/doc'
      }
    })
  );
}
