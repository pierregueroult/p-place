import Header from "@/components/header";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Providers from "@/components/providers";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
