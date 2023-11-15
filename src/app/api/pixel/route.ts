import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

async function handler(req: NextRequest) {
  const { x, y, color } = await req.json();

  if (!x || !y || !color) {
    return NextResponse.json(
      { error: "Des champs sont manquants." },
      { status: 400 }
    );
  }

  if (x < 0 || x > 6400 || y < 0 || y > 6400) {
    return NextResponse.json(
      { error: "Les coordonnées sont invalides." },
      { status: 400 }
    );
  }

  if (color.length !== 6) {
    return NextResponse.json(
      { error: "La couleur est invalide." },
      { status: 400 }
    );
  }

  await prisma.map.updateMany({
    where: {
      x: x,
      y: y,
    },
    data: {
      colorHex: color,
    },
  });

  return NextResponse.json(
    { message: "La couleur a bien été modifiée." },
    { status: 200 }
  );
}

export { handler as POST };
