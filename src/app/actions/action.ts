import { db } from "@/server/db";
import { z } from "zod";

const habitSchema = z.object({
  badHabit: z.string().min(1, "Bad habit is required"),
  goodHabit: z.string().min(1, "Good habit is required"),
});

export const createHabit = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  const parsedData = habitSchema.parse(data);

  await db.habit.create({
    data: {
      badHabit: parsedData.badHabit,
      goodHabit: parsedData.goodHabit,
      createdAt: new Date(),
    },
  });
};
