import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as tasksSchema from '@/db/schema/tasks';
import env from '@/env';

const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN
});

export const db = drizzle(client, {
  schema: {
    ...tasksSchema
  }
});
