"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { useRef, useState } from "react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export default function AuthRegisterForm() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  async function handleClick() {
    if (!formRef.current) return;
    const data = Object.fromEntries(new FormData(formRef.current));
    if (!data) return;

    try {
      setLoading(true);
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();

      toast({
        title: res.status === 200 ? "Compte crée, connectez-vous" : "Erreur !",
        description:
          res.status !== 200
            ? resData.error!
            : `${new Date().toLocaleTimeString()}`,
        variant: res.status === 200 ? undefined : "destructive",
      });

      if (res.status === 200) router.push("/auth/login");

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Créer un compte</CardTitle>
        <CardDescription>
          Commencer à placer des pixels sur la carte, en un seul clic !
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form method="POST" ref={formRef} action="/api/register">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Nom d&apos;utilisateur :</Label>
              <Input
                id="username"
                placeholder="@jeanmoulin56"
                name="username"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Adresse E-Mail :</Label>
              <Input id="email" placeholder="jeanmoulin@gouv.fr" name="email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Mot de passe :</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                name="password"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="passwordConfirmation">
                Confirmer le mot de passe :
              </Label>
              <Input
                id="passwordConfirmation"
                type="password"
                placeholder="••••••••"
                name="passwordConfirmation"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
          onClick={handleClick}
        >
          {loading ? "Chargement..." : "Créer un compte"}
        </Button>
      </CardFooter>
    </Card>
  );
}
