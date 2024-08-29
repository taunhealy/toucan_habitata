import { useState } from "react";
import { createHabit } from "@/app/actions/action";
import { Button } from "@/components/ui/button";
import { getSession } from "next-auth/react";

const badHabits = ["Caffeine", "Social media", "Video streaming"];
const goodHabits = ["Yoga/stretching", "Deep breathing", "Exercise"];

export default function HabitForm() {
  const [selectedBadHabit, setSelectedBadHabit] = useState<string | null>(null);
  const [selectedGoodHabit, setSelectedGoodHabit] = useState<string | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedBadHabit || !selectedGoodHabit) {
      setError("Please select both a bad habit and a good habit.");
      return;
    }
    setIsPending(true);
    const formData = new FormData();
    formData.append("badHabit", selectedBadHabit);
    formData.append("goodHabit", selectedGoodHabit);

    try {
      await createHabit(formData);
      setError(null);
      const session = await getSession();
      if (session) {
        const res = await fetch(`/api/user/${session.user.id}/progress`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ success: true }),
        });
        if (!res.ok) throw new Error("Failed to update progress");
      }
    } catch (err) {
      setError("An error occurred while creating the habit.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
      <div>
        <h3>Select a bad habit to replace:</h3>
        <div className="flex gap-2">
          {badHabits.map((habit) => (
            <Button
              key={habit}
              variant={selectedBadHabit === habit ? "destructive" : "outline"}
              onClick={() => setSelectedBadHabit(habit)}
              disabled={isPending}
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
              variant={selectedGoodHabit === habit ? "default" : "outline"}
              onClick={() => setSelectedGoodHabit(habit)}
              disabled={isPending}
            >
              {habit}
            </Button>
          ))}
        </div>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="rounded-sm bg-blue-500 px-3 py-2 text-white"
      >
        Submit
      </button>
      {isPending && <p>Please wait...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
