import { db } from "@/server/db";
import Journey from "@/app/components/Journey";

interface PageProps {
  params: { id: string };
}

export default async function UserJourney({ params }: PageProps) {
  const userId = params.id;

  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      journeys: true,
    },
  });

  if (!user) {
    return <p>User not found.</p>;
  }
  //@ts-ignore
  return <Journey user={user} />;
}
