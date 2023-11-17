import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  const messages = await prisma.message.findMany({
    take: 25,
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(
    messages.map((message) => ({
      username: message.username,
      text: message.text,
    }))
  );
}

export { handler as GET };
