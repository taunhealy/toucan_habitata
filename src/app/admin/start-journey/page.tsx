import { Button } from "@/app/components/ui/button";
import { createJourney } from "@/server/actions/action";

const badHabits = ["Caffeine", "Social media", "Video streaming"];
const goodHabits = ["Yoga/stretching", "Deep breathing", "Exercise"];

export default function StartJourney() {
  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Start A New Journey
        </h1>
        <p className="text-muted-foreground">
          Choose your habits to begin a new journey.
        </p>
      </div>
      <section className="flex flex-col gap-4">
        <form action={createJourney} className="flex flex-col gap-y-2">
          <div>
            <h3>Select a bad habit to replace:</h3>
            <div className="flex gap-2">
              {badHabits.map((habit) => (
                <Button
                  key={habit}
                  variant="outline"
                  name="badHabit"
                  value={habit}
                  type="submit"
                >
                  {habit}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h3>Select a good habit to adopt:</h3>
            <div className="flex gap-2">
              {goodHabits.map((habit) => (
                <Button
                  key={habit}
                  variant="outline"
                  name="goodHabit"
                  value={habit}
                  type="submit"
                >
                  {habit}
                </Button>
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </section>
    </main>
  );
}
