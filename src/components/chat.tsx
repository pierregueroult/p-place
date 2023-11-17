"use client";
import { Card, CardFooter, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useSession } from "next-auth/react";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { useToast } from "./ui/use-toast";
import { io } from "socket.io-client";
import { Badge } from "./ui/badge";

type ChatType = {
  username: string;
  text: string;
};

const websocketUrl =
  process.env.NODE_ENV === "production"
    ? "https://placewebsocket.pierregueroult.dev"
    : "http://localhost:4000";

export default function Chat() {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<{
    username: string;
    mail: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatType[]>([]);

  useEffect(() => {
    async function getUsername(mail: string) {
      try {
        const res = await fetch(`/api/account/username?mail=${mail}`);
        const data = await res.json();
        setUserInfo(data);
        setLoading(false);
      } catch (e) {
        setUserInfo(null);
        setLoading(true);
      }
    }

    if (session?.user?.email) getUsername(session.user.email);
  }, [session]);

  useEffect(() => {
    async function getLatestMessages() {
      const res = await fetch("/api/message/latest");
      if (res.status !== 200) return;
      const data: ChatType[] = await res.json();
      setMessages(data);
    }
    const socket = io(websocketUrl);

    socket.connect();

    socket.on("new-message", (data: ChatType) => {
      setMessages((messages) => [data, ...messages]);
    });

    getLatestMessages();

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInfo || !userInfo.mail || !userInfo.username) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const message = formData.get("message");
    if (!message) return;
    const messageString = message.toString();
    if (!messageString || messageString.length === 0) return;

    const res = await fetch("/api/message/new", {
      method: "POST",
      body: JSON.stringify({
        message: messageString,
        username: userInfo?.username,
        mail: userInfo?.mail,
      }),
    });
    const data = await res.json();
    if (res.status === 200) {
      toast({
        title: "Message envoyé",
        description: "Votre message a bien été envoyé",
      });
      form.reset();
    } else {
      toast({
        title: "Erreur dans le message",
        description: data.error,
      });
    }
  };

  return (
    <Card className="w-full h-full flex flex-col max-h-[400px]">
      <CardContent className="flex-grow overflow-y-scroll">
        <div className="flex flex-col-reverse h-auto">
          {messages.map((message, i) => (
            <div key={i} className="flex flex-col gap-1 my-2">
              <Badge className="w-fit">{message.username}</Badge>
              <span className="text-sm opacity-70 leading-4">
                {message.text}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        {status === "loading" || loading || !userInfo ? (
          <div className="flex-grow flex flex-col gap-2 w-full">
            <Skeleton className="w-6/12 h-4" />
            <div className="flex gap-2">
              <Skeleton className="flex-grow h-10" />
              <Skeleton className="w-10 h-10" />
            </div>
          </div>
        ) : (
          <form
            className="flex flex-col gap-2 w-full pt-2"
            onSubmit={handleSubmit}
            target="/api/message/new"
          >
            <Label htmlFor="message">Entrer un Message</Label>
            <div className="flex gap-2">
              <Input
                id="message"
                name="message"
                placeholder="Message"
                autoComplete="off"
                required
                className="flex-grow"
              />
              <Button type="submit" size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </form>
        )}
      </CardFooter>
    </Card>
  );
}
