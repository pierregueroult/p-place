"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Moon, Sun, Boxes } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import Link from "next/link";

export default function Header() {
  const { setTheme } = useTheme();
  const { data: session } = useSession();

  return (
    <header className="h-14 w-full border-b">
      <div className="container flex items-center justify-between h-full">
        <p>P/PLACE</p>
        <div className="flex items-center justify-between h-full gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/p/place" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Jouer sur la carte
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Informations</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-6 w-[400px] flex">
                    <div className="w-fit h-auto p-6 rounded-md border flex items-center justify-center h-14">
                      <Boxes />
                    </div>
                    <div className="pl-6">
                      <p className="text-xs text-center">
                        P/PLACE est un jeu ... bref, il s&apos;inspire du
                        R/PLACE de Reddit, mais c&apos;est un projet sympa pour
                        un étudiant qui a du temps à perdre et des compétences
                        en code.
                      </p>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Compte</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="gap-3 p-6 w-[400px] flex flex-col items-start justify-center">
                    {!session ? (
                      <>
                        <li className="w-fit">
                          <Link href="/auth/login" className="text-sm">
                            Se connecter
                          </Link>
                        </li>
                        <li className="w-fit">
                          <Link href="/auth/register" className="text-sm">
                            Créer un compte
                          </Link>
                        </li>
                      </>
                    ) : (
                      <li className="w-fit">
                        <Link
                          href="/auth/signout"
                          className="text-sm"
                          onClick={(e) => {
                            e.preventDefault();
                            signOut();
                          }}
                        >
                          Se déconnecter
                        </Link>
                      </li>
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
