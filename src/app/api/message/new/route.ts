import prisma from "@/lib/prisma";
import { sanitize } from "@/lib/sanitize";

import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  const { message, username, mail } = await req.json();

  if (!message || !username || !mail) {
    return NextResponse.json(
      { error: "Des champs sont manquants." },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: mail,
      username: username,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Cet utilisateur n'existe pas." },
      { status: 400 }
    );
  }

  const messageText = sanitize(message);

  const newMessage = await prisma.message.create({
    data: {
      text: messageText,
      username: username,
    },
  });

  return NextResponse.json(
    {
      message: newMessage.text,
      username: newMessage.username,
    },
    {
      status: 200,
    }
  );
}

export { handler as POST };
