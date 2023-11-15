"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { useState, useRef } from "react";
import { useToast } from "./ui/use-toast";

interface updatePixelProps {
  colors: string[];
  coords: number[];
}

export default function UpdatePixel({ colors, coords }: updatePixelProps) {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  async function updatePixel(x: number, y: number, color: string) {
    const res = await fetch("/api/pixel", {
      method: "POST",
      body: JSON.stringify({ x, y, color }),
    });
    return res;
  }

  async function handleClick() {
    var lastvote = localStorage.getItem("lastvote");
    // if lastvote does not exist or is more than 5 minutes ago

    if (
      !lastvote ||
      (new Date().getTime() - new Date(lastvote).getTime()) / 1000 > 300
    ) {
      setLoading(true);
      const form = new FormData(formRef.current!);
      const color = Object.fromEntries(form.entries()).color as string;

      const res = await updatePixel(coords[0], coords[1], color);
      setLoading(false);
      if (res.status !== 200) {
        toast({
          title: "Erreur !",
          description: await res.json(),
          variant: "destructive",
        });
      } else {
        toast({
          title: "Succès !",
          description:
            "Pixel modifié, le changement sera visible dans quelques secondes",
        });
        localStorage.setItem("lastvote", new Date().toString());
      }
    } else {
      toast({
        title: "Erreur !",
        description: "Vous devez attendre 5 minutes entre chaque vote",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Modifier un pixel</CardTitle>
        <CardDescription>
          Choisissez la couleur du pixel à modifier
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          method="POST"
          action="/api/update-pixel"
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1 5">
              <Label htmlFor="color">Couleur :</Label>
              <RadioGroup
                defaultValue={colors[0]}
                className="grid grid-cols-2"
                name="color"
              >
                {colors.map((color, i) => (
                  <div className="flex items-center space-x-2" key={i}>
                    <RadioGroupItem value={color} id={color} />
                    <Label htmlFor={color}>{color}</Label>
                  </div>
                ))}
              </RadioGroup>
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
          {loading ? "Chargement..." : "Modifier"}
        </Button>
      </CardFooter>
    </Card>
  );
}
