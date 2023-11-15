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

import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthLoginForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        callbackUrl: "/",
        redirect: false,
        username: data.get("name") as string,
        password: data.get("password") as string,
      });

      if (!res) throw new Error("No response");

      if (res.status === 200) router.push(res.url || "/");

      if (res.status === 401) throw new Error("Unauthorized");

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Se connecter</CardTitle>
        <CardDescription>
          Commencer à placer des pixels sur la carte, en un seul clic !
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form method="POST" ref={formRef}>
          <div className="grid w-full items-center gap-4">
            {/* <input name="csrfToken" type="hidden" defaultValue={token} /> */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nom d&apos;utilisateur :</Label>
              <Input id="name" placeholder="@jeanmoulin56" name="name" />
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
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="w-full"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Chargement..." : "Se connecter"}
        </Button>
      </CardFooter>
    </Card>
  );
}
