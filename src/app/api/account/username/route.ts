import prisma from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.nextUrl);
  const mail = searchParams.get("mail");

  if (!mail) {
    return NextResponse.next();
  }

  const user = await prisma.user.findUnique({
    where: {
      email: mail,
    },
  });

  if (!user) {
    return NextResponse.next();
  }

  return NextResponse.json(
    {
      username: user.username,
      mail: user.email,
    },
    {
      status: 200,
    }
  );
}

export { handler as GET };
