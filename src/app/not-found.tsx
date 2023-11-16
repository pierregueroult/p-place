"use client";

import { Separator } from "@/components/ui/separator";

export default function NotFound() {
  return (
    <main className="flex-grow flex items-center justify-center w-full gradient-main">
      <div className="flex flex-col items-center justify-center w-fit h-full">
        <h1 className="text-9xl font-bold">404</h1>
        <Separator orientation="horizontal" />
        <p className="text-2xl font-semibold mt-4">Page non trouvée</p>
      </div>
    </main>
  );
}
