import TriggerTheme from "./trigger-theme";
import TriggerUser from "./trigger-user";
import Navigation from "./navigation";
import { Boxes } from "lucide-react";

export default async function Header() {
  return (
    <header className="h-14 w-full border-b sticky">
      <div className="container flex items-center justify-between h-full">
        <div className="flex items-center gap-2">
          <Boxes className="h-6 w-6" />
          <span className="text-xl font-bold">p/place</span>
        </div>
        <div className="flex items-center justify-between h-full gap-2">
          <Navigation />
          <TriggerUser />
          <TriggerTheme />
        </div>
      </div>
    </header>
  );
}
