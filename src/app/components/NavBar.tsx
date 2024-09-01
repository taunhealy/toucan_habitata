import Link from "next/link";
import { Button } from "./ui/button";
import SigninButton from "./SignInButton";

export default function Navbar() {
  return (
    <header className="shadow-sm">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight">Habitata</span>
        </Link>
        <div className="flex gap-4">
          <Button variant="outline" asChild></Button>
          <Button asChild>
            <Link href="/start-journey">Start A Journey</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
