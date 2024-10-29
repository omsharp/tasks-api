import { db } from '@/db';
import { insertTaskSchema, tasks, updateTaskSchema } from '@/db/schema/tasks';
import { eq } from 'drizzle-orm';
import type { z } from 'zod';

export const getAllTasks = async () => {
  return await db.query.tasks.findMany();
};

export const getTaskById = async (id: number) => {
  return await db.query.tasks.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    }
  });
};

export const insertTask = async (values: z.infer<typeof insertTaskSchema>) => {
  const [task] = await db.insert(tasks).values(values).returning();
  return task;
};

export const updateTask = async (
  id: number,
  values: z.infer<typeof updateTaskSchema>
) => {
  const [task] = await db
    .update(tasks)
    .set(values)
    .where(eq(tasks.id, id))
    .returning();

  return task;
};

export const deleteTask = async (id: number) => {
  const result = await db.delete(tasks).where(eq(tasks.id, id));
  return result.rowsAffected > 0;
};
