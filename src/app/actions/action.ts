import { db } from "@/server/db";
import { z } from "zod";

const habitSchema = z.object({
  content: z.string().min(1, "Habit content is required"),
});

export const createHabit = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  const parsedData = habitSchema.parse(data);

  await db.habit.create({
    data: {
      content: parsedData.content,
      createdAt: new Date(),
    },
  });
};
