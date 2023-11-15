"use client";

import { signOut, useSession } from "next-auth/react";
// prettier-ignore
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TriggerUser() {
  const { data: session } = useSession();

  const isSignedIn = !!session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <User className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Toggle user</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        {isSignedIn ? (
          <>
            <DropdownMenuItem>
              <Link href="/user" className="text-sm">
                Mon compte
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <p
                className="text-sm"
                onClick={() =>
                  signOut({
                    callbackUrl: "/",
                  })
                }
              >
                Se déconnecter
              </p>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <Link href="/auth/login" className="text-sm">
                Se connecter
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/auth/register" className="text-sm">
                Créer un compte
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
