import { z, ZodError } from 'zod';
import { config as dotenvConfig } from 'dotenv';
import { expand as dotenvExpand } from 'dotenv-expand';

dotenvExpand(dotenvConfig());

const EnvSchema = z
  .object({
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().optional()
  })
  .superRefine((input, ctx) => {
    // if in production and db auth token is empty then throw error
    if (input.NODE_ENV === 'production' && !input.DATABASE_AUTH_TOKEN) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: 'string',
        received: 'undefined',
        path: ['DATABASE_AUTH_TOKEN'],
        message: "Must be set when NODE_ENV is 'production'"
      });
    }
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
