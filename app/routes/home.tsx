import PlayerPage from "~/Home/components/PlayerPage";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
 return [
  { title: "Radio Player App" },
  { name: "description", content: "Welcome to Radio Player App!" },
 ];
}

export default function Home() {
 return (
  <main className="w-full h-full">
   <PlayerPage />
  </main>
 );
}
