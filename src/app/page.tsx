import HabitForm from "@/components/HabitForm";
import { db } from "@/server/db";

export default async function Home() {
  const habits = await db.habit.findMany();

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Productive Habits
        </h1>
        <p className="text-muted-foreground">
          Replace destructive habits with productive ones.
        </p>
      </div>
      <section className="flex flex-col gap-4">
        <HabitForm />
        <ul>
          {habits.map((habit) => (
            <li key={habit.id} className="py-2 px-3 border-b">
              {habit.content}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
