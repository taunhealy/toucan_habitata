import { getSession } from "next-auth/react";
import { db } from "@/server/db";
import Link from "next/link";
import SigninButton from "./components/SignInButton";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    return (
      <>
        <p>Please log in to view your journeys.</p>
      </>
    );
  }

  const journeys = await db.journey.findMany({
    // @ts-ignore
    where: { userId: session?.user?.id },
  });

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Your Journeys
        </h1>
        <p className="text-muted-foreground">
          Track your progress and replace destructive habits with productive
          ones.
        </p>
      </div>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {journeys.map((journey) => (
          <Link key={journey.id} href={`/user/${journey.userId}`}>
            <a className="rounded border p-4 shadow">
              <h2 className="text-xl font-bold">{journey.goodHabit}</h2>
              <p>Bad Habit: {journey.badHabit}</p>
              <p>Stage: {journey.stage}</p>
              <p>Day: {journey.day}</p>
            </a>
          </Link>
        ))}
      </section>
    </main>
  );
}
