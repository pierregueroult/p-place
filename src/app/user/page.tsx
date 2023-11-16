import { getServerSession } from "next-auth/next";
import { options } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DeleteUserButton from "@/components/delete-button";

export default async function UserPage() {
  const session = await getServerSession({ ...options, req: null });

  if (!session || !session.user || !session.user.email) redirect("/auth/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user!.email },
  });

  return (
    <main className="w-full flex-grow gradient-main">
      <div className="w-full h-full w-full p-8 mx-auto md:w-[700px]">
        <h2 className="text-2xl font-bold ">Mes informations</h2>
        <div className="flex flex-col gap-2 mt-4">
          <Label htmlFor="username">Nom d&apos;utilisateur</Label>
          <div className="flex gap-2 items-center">
            <Input
              id="username"
              type="text"
              value={user?.username}
              disabled
              className="w-full"
            />
            <Button variant={"outline"}>Modifier</Button>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <Label htmlFor="email">Email</Label>
          <div className="flex gap-2 items-center">
            <Input
              id="email"
              type="email"
              value={user?.email}
              disabled
              className="w-full"
            />
            <Button variant={"outline"}>Modifier</Button>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <Label htmlFor="password">Mot de passe</Label>
          <div className="flex gap-2 items-center">
            <Input
              id="password"
              type="password"
              value="********"
              disabled
              className="w-full"
            />
            <Button variant={"outline"}>Modifier</Button>
          </div>
        </div>
      </div>
      <div className="w-hull h-full w-full p-8 mx-auto md:w-[700px]">
        {/* danger zone */}
        <h2 className="text-2xl font-bold text-red-500">Zone de Danger</h2>
        <DeleteUserButton session={session} />
      </div>
    </main>
  );
}
