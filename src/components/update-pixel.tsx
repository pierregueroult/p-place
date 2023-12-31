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
import { useSession } from "next-auth/react";

interface updatePixelProps {
  colors: {
    name: string;
    color: string;
  }[];
  coords: number[];
  setSelectedPixel: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function UpdatePixel({
  colors,
  coords,
  setSelectedPixel,
}: updatePixelProps) {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const { data: session } = useSession();

  async function updatePixel(x: number, y: number, color: string) {
    const res = await fetch("/api/pixel", {
      method: "POST",
      body: JSON.stringify({ x, y, color }),
    });
    return res;
  }

  async function handleClick() {
    var lastvote = localStorage.getItem("lastvote");
    // if lastvote does not exist or is more than 1 minute old

    if (!lastvote || Date.now() - parseInt(lastvote) > 60 * 1000) {
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
        if (session?.user?.email === "pierregueroult2022@gmail.com") return;
        localStorage.setItem("lastvote", Date.now().toString());
      }
    } else {
      toast({
        title: "Erreur !",
        description: `Vous devez attendre 1 minutes entre chaque vote. (encore ${
          60 - Math.floor((Date.now() - parseInt(lastvote)) / 1000)
        } secondes)`,
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="w-full mb-8 md:mb-0">
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
                defaultValue={colors[0].color}
                className="grid grid-cols-2"
                name="color"
              >
                {colors.map((color, i) => (
                  <div className="flex items-center space-x-2" key={i}>
                    <RadioGroupItem value={color.color} id={color.name} />
                    <Label htmlFor={color.name} className="flex items-center">
                      <div
                        className="w-4 h-4 mr-2 rounded-full"
                        style={{ backgroundColor: `#${color.color}` }}
                        role="none"
                      ></div>
                      {color.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-4 w-full">
        <Button
          variant={"outline"}
          onClick={(e) => {
            e.preventDefault();
            setSelectedPixel([-1, -1]);
          }}
        >
          Annuler
        </Button>
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
