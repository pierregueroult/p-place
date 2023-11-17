import Header from "@/components/header";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Providers from "@/components/providers";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | p/place",
    default: "Bienvenue sur p/place",
  },
  description:
    "Le r/place par pierre guéroult, codé en 3 jours pour le plaisir",
  metadataBase: new URL("https://place.pierregueroult.dev"),
  authors: [
    {
      name: "Pierre Guéroult",
      url: "https://pierregueroult.dev",
    },
  ],
  generator: "next.js",
  robots: "noindex, nofollow",
  keywords: [
    "place",
    "pierre",
    "guéroult",
    "pixel",
    "map",
    "r/place",
    "reddit",
    "clone",
  ],
};

const fontSans = FontSans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="fr" suppressHydrationWarning dir="ltr">
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased flex flex-col",
            fontSans.variable
          )}
        >
          <Providers>
            <Header />
            {children}
            <Toaster />
          </Providers>
        </body>
      </html>
    </>
  );
}
