import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

const stages = [
  { stage: 1, days: 16, color: "#88B04B", terrain: "Lush forest, grasslands, or plains" },
  { stage: 2, days: 8, color: "#A9A9A9", terrain: "Rocky hills, mountainous terrain, or cliffs" },
  { stage: 3, days: 12, color: "#E3B778", terrain: "Desert with dunes, arid lands, and scarce vegetation" },
  { stage: 4, days: 18, color: "#8B4513", terrain: "Swamps, murky wetlands, or volcanic regions" },
  { stage: 5, days: 27, color: "#6BA292", terrain: "Fertile valleys, riverlands, or a bountiful oasis" },
];

export default function Journey() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const session = await getSession();
      if (session) {
        const res = await fetch(`/api/user/${session.user.id}`);
        const data = await res.json();
        setUser(data);
      }
    }
    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  const currentStage = stages.find(stage => user.day <= stage.days);

  return (
    <div className="journey">
      <h1>{user.name}'s Journey</h1>
      <div className="stage" style={{ backgroundColor: currentStage.color }}>
        <h2>Stage {currentStage.stage}: {currentStage.terrain}</h2>
        <p>Day {user.day}/{currentStage.days}</p>
        <p>Lives remaining: {user.lives}</p>
      </div>
    </div>
  );
}