import { db } from '@/db';
import { tasks } from '@/db/schema/tasks';

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

export const insertTask = async ({
  title,
  done
}: {
  title: string;
  done: boolean;
}) => {
  const [task] = await db.insert(tasks).values({ title, done }).returning();
  return task;
};
