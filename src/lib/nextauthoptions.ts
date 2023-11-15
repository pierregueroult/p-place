import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

export const options: NextAuthOptions = {
  providers: [
    Credentials({
      type: "credentials",
      name: "Credentials",
      credentials: {
        username: {
          label: "Nom d'utilisateur",
          type: "text",
          placeholder: "@jeandupont85",
        },
        password: {
          label: "Mot de passe",
          type: "password",
          placeholder: "********",
        },
      },
      // @ts-ignore
      async authorize(credentials, req) {
        console.log("credentials", credentials);

        const user = await prisma.user.findUnique({
          where: {
            username: credentials!.username,
          },
        });
        if (user && user.password === credentials!.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
};
