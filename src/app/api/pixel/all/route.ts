import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  const map = await prisma.map.findMany({
    select: {
      x: true,
      y: true,
      colorHex: true,
    },
  });

  return NextResponse.json(map);
}

export { handler as GET };
