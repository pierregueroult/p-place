import { getServerSession } from "next-auth/next";
import { options } from "@/lib/auth";
import { redirect } from "next/navigation";
import Map from "@/components/map";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "La carte",
};

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
    <main className="flex flex-grow flex-col lg:flex-row items-center justify-center w-full gap-4 pt-4 md:pt-0">
      <Map initialMapData={map} />
    </main>
  );
}
