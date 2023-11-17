"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface CguAcceptedProps {
  children: React.ReactNode;
}

export default function CguAccepted(props: CguAcceptedProps) {
  const [accepted, setAccepted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleClick = () => {
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);
    const terms = data.get("terms");
    if (terms === "on") {
      localStorage.setItem("cguAccepted", "true");
      setAccepted(true);
    }
  };

  useEffect(() => {
    const cguAccepted = localStorage.getItem("cguAccepted");
    if (cguAccepted) setAccepted(true);
  }, []);

  return (
    <>
      {accepted ? (
        props.children
      ) : (
        <Card className="w-full flex-grow">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Conditions d&apos;utilisation
            </CardTitle>
            <CardDescription>
              Accepter les conditions d&apos;utilisation pour accéder au chat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex items-center space-x-2" ref={formRef}>
              <Checkbox id="terms" name="terms" />
              <Label htmlFor="terms" className="line-clamp-2 text-sm leading-5">
                J&apos;accepte{" "}
                <a
                  href="https://pierregueroult.dev/legals/termsofuse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-white"
                >
                  les conditions d&apos;utilisation
                </a>{" "}
                et{" "}
                <a
                  href="https://pierregueroult.dev/legals/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  la politique de confidentialité
                </a>
              </Label>
            </form>
          </CardContent>
          <CardFooter>
            <Button onClick={handleClick} className="w-full">
              Continuer
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
