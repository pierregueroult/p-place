import IsOnline from "@/components/is-online";
import { Badge } from "@/components/ui/badge";
import { PieChart, User, Code, AppWindow } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import LiveImage from "@/components/live-image";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";

export default async function Home() {
  const userCount = await prisma.user.count();

  return (
    <main className="gradient-main flex-grow">
      <section className="w-full flex container items-center justify-around py-16">
        <div>
          <h1 className="text-5xl font-bold">
            Bienvenue sur <span className="lowercase">p/place</span>
          </h1>
          <Badge variant="outline" className="mt-2">
            le r/place par
            <a
              href="https://pierregueroult.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1"
            >
              pierre guéroult
            </a>
            , codé en 3 jours
          </Badge>
          <p className="mt-4">
            Rejoignez la communauté et placez votre pixel sur la map !
          </p>
          <div className="flex mt-4 gap-2 flex-col md:flex-row">
            <Button className="cursor-default">
              <IsOnline />
            </Button>
            <Link
              href="/p/place"
              className={buttonVariants({ variant: "outline" })}
            >
              Rejoindre la map
            </Link>
          </div>
        </div>
        <div>
          <LiveImage className="w-64 h-64 opacity-50 hover:opacity-100 transition-opacity transition-duration-500 hidden md:block" />
        </div>
      </section>
      <section className="w-full container grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Nombre total de pixels
            </CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6400</div>
            <p className="text-xs text-muted-foreground">
              1 par personne par minute
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Nombre d&apos;utilisateurs
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount}</div>
            <p className="text-xs text-muted-foreground">
              ont déjà rejoint la communauté
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Jour de développement
            </CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              jours de codage intensif
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Technologies utilisées
            </CardTitle>
            <AppWindow className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              technologies utilisées
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
