import { createHabit } from "@/actions/action";
import { useActionState } from "react";

export default function HabitForm() {
  const { error, action, isPending } = useActionState(createHabit, null);

  return (
    <form onSubmit={action} className="flex flex-col gap-y-2">
      <input
        type="text"
        name="content"
        placeholder="New habit"
        className="py-2 px-3 rounded-sm"
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-500 text-white py-2 px-3 rounded-sm"
      >
        Submit
      </button>
      {isPending && <p>Please wait...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}