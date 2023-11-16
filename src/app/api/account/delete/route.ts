import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import hash from "sha256";

async function handler(req: NextRequest) {
  const { mail, password } = await req.json();

  if (!mail || !password) {
    return NextResponse.json(
      { error: "Veuillez renseigner tous les champs." },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: mail,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Cet utilisateur n'existe pas." },
      { status: 400 }
    );
  }

  if (user.password !== hash(password)) {
    return NextResponse.json(
      { error: "Le mot de passe est incorrect." },
      { status: 400 }
    );
  }

  await prisma.user.delete({
    where: {
      email: mail,
    },
  });

  return NextResponse.json(
    { message: "L'utilisateur a bien été supprimé." },
    { status: 200 }
  );
}

export { handler as DELETE };
