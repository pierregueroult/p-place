"use client";
import { Separator } from "./ui/separator";
// prettier-ignore
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuContent, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { Boxes } from "lucide-react";
import Link from "next/link";

export default function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Accueil
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/p/place" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Jouer sur la carte
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <Separator orientation="vertical" className="h-8" />
        <NavigationMenuItem>
          <NavigationMenuTrigger>Informations</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-6 w-[400px] flex">
              <div className="w-fit h-auto p-6 rounded-md border flex items-center justify-center h-14">
                <Boxes />
              </div>
              <div className="pl-6">
                <p className="text-xs text-center">
                  P/PLACE est un jeu ... bref, il s&apos;inspire du R/PLACE de
                  Reddit, mais c&apos;est un projet sympa pour un étudiant qui a
                  du temps à perdre et des compétences en code.
                </p>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
