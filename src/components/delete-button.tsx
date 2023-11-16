"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useRef, useState } from "react";

interface Props {
  session: Session;
}

export default function DeleteUserButton({ session }: Props) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!formRef.current) return;
    if (!session.user?.email) return;
    const formData = new FormData(formRef.current);
    const password = formData.get("password");

    if (!password) return;
    setLoading(true);
    const res = await fetch("/api/account/delete", {
      method: "DELETE",
      body: JSON.stringify({ password, mail: session.user.email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.status !== 200) {
      toast({
        title: "Erreur !",
        description: data.error,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    toast({
      title: "Compte supprimé",
      description: `${new Date().toLocaleTimeString()}`,
    });
    setLoading(false);
    signOut();
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      <Label htmlFor="delete">Supprimer mon compte</Label>
      <div className="flex gap-2 items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              id="delete"
              type="button"
              variant="destructive"
              className="w-full"
            >
              Supprimer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Etes-vous sûr de vouloir supprimer votre compte ?
              </DialogTitle>
              <DialogDescription>
                Cette action est irréversible. Vous perdrez toutes vos données.
              </DialogDescription>
            </DialogHeader>
            <form
              className="flex flex-col gap-2 mt-4"
              ref={formRef}
              onSubmit={(e) => e.preventDefault()}
            >
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                autoFocus={false}
                name="password"
              />
            </form>
            <DialogFooter className="grid grid-cols-2 gap-2 w-full">
              <DialogClose asChild>
                <Button variant="outline">Annuler</Button>
              </DialogClose>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Suppression en cours..." : "Supprimer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
