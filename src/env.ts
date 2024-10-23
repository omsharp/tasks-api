import { z, ZodError } from 'zod';
import { config as dotenvConfig } from 'dotenv';
import { expand as dotenvExpand } from 'dotenv-expand';

dotenvExpand(dotenvConfig());

const EnvSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace'])
  // DATABASE_URL: z.string().url().min(1),
});

export type Env = z.infer<typeof EnvSchema>;
let env: Env;
try {
  env = EnvSchema.parse(process.env);
} catch (e) {
  const error = e as ZodError<any>;
  error.flatten();
  console.error('invalid env:');
  console.error(error.flatten().fieldErrors);
  process.exit(1);
}

export default env;
