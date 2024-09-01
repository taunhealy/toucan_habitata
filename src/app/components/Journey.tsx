import { stages } from "@/constants/stages";

interface User {
  day: number;
  name: string;
  lives: number;
}

export default function Journey({ user }: { user: User }) {
  const currentStage = stages.find((stage) => user.day <= stage.days);

  return (
    <div className="journey">
      <h1>{user.name}'s Journey</h1>
      {currentStage ? (
        <div className="stage" style={{ backgroundColor: currentStage.color }}>
          <h2>
            Stage {currentStage.stage}: {currentStage.terrain}
          </h2>
          <p>
            Day {user.day}/{currentStage.days}
          </p>
          <p>Lives remaining: {user.lives}</p>
        </div>
      ) : (
        <p>No current stage found.</p>
      )}
    </div>
  );
}
