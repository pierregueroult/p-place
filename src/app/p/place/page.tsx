import { getServerSession } from "next-auth/next";
import { options } from "@/lib/nextauthoptions";
import { redirect } from "next/navigation";
import Map from "@/components/map";
import prisma from "@/lib/prisma";

export default async function PlacePage() {
  const session = await getServerSession({ ...options, req: null });

  const data = await prisma.map.findMany();
  const map = data.map((item) => ({
    coords: [item.x, item.y],
    colorHex: item.colorHex,
  }));

  if (!map || map.length !== 6400) redirect("/");

  if (!session) redirect("/auth/login");
  return (
    <main className="flex-grow flex items-center justify-center w-full">
      <Map initialMapData={map} />
    </main>
  );
}
