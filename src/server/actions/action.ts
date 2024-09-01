import { db } from "@/server/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const habitSchema = z.object({
  badHabit: z.string().min(1, "Bad habit is required"),
  goodHabit: z.string().min(1, "Good habit is required"),
});

export const createJourney = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  const parsedData = habitSchema.parse(data);

  await db.habit.create({
    data: {
      badHabit: parsedData.badHabit,
      goodHabit: parsedData.goodHabit,
      createdAt: new Date(),
    },
  });

  // Revalidate the home page to show the new journey
  revalidatePath("/");
};

export const getUser = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id: String(id) },
    select: {
      id: true,
      name: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
