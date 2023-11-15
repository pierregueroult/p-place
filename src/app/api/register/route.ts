import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

async function handler(req: Request) {
  // get params from request post body
  const { username, password, email, passwordConfirmation } = await req.json();

  if (!username || !password || !email || !passwordConfirmation) {
    return NextResponse.json(
      { error: "Des champs sont manquants." },
      { status: 400 }
    );
  }

  if (
    username.length === 0 ||
    password.length === 0 ||
    email.length === 0 ||
    passwordConfirmation.length === 0
  ) {
    return NextResponse.json(
      { error: "Les champs sont vides." },
      { status: 400 }
    );
  }

  // test email with regex
  const emailRegex = new RegExp(
    // eslint-disable-next-line no-control-regex
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]" +
      "(?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?" +
      "(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
  );

  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Le mail ne répond pas au format demandé." },
      { status: 400 }
    );
  }

  if (password !== passwordConfirmation) {
    return NextResponse.json(
      {
        error: "Les mots de passe ne correspondent pas.",
      },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password,
        email,
      },
    });

    if (!user)
      return NextResponse.json(
        { error: "Erreur Base de données." },
        { status: 404 }
      );

    return NextResponse.json({ message: "Utilisateur crée." }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Ce compte existe déjà" },
      { status: 400 }
    );
  }
}

export { handler as POST };
