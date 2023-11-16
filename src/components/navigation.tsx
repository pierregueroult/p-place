"use client";

import { Separator } from "./ui/separator";
// prettier-ignore
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuContent, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { Boxes, MenuIcon } from "lucide-react";
import Link from "next/link";
// prettier-ignore
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const links = [
  {
    label: "Accueil",
    href: "/",
  },
  {
    label: "Jouer sur la carte",
    href: "/p/place",
  },
];

export default function Navigation() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon">
            <MenuIcon />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {links.map((link) => (
            <DropdownMenuItem key={link.href}>
              <Link href={link.href} legacyBehavior passHref>
                {link.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <NavigationMenu className="md:flex hidden">
        <NavigationMenuList>
          {links.map((link) => (
            <NavigationMenuItem key={link.href}>
              <Link href={link.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {link.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
          <Separator orientation="vertical" className="h-8 md:block hidden" />
          <NavigationMenuItem className="md:block hidden">
            <NavigationMenuTrigger>Informations</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="p-6 w-[400px] flex">
                <div className="w-fit h-auto p-6 rounded-md border flex items-center justify-center h-14">
                  <Boxes />
                </div>
                <div className="pl-6">
                  <p className="text-xs text-center">
                    P/PLACE est un jeu ... bref, il s&apos;inspire du R/PLACE de
                    Reddit, mais c&apos;est un projet sympa pour un étudiant qui
                    a du temps à perdre et des compétences en code.
                  </p>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
