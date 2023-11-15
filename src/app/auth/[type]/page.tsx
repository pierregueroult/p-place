import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthLoginForm from "@/components/login-form";
import AuthRegisterForm from "@/components/register-form";
import { getServerSession } from "next-auth/next";
import { options } from "@/lib/nextauthoptions";
import { redirect } from "next/navigation";

interface AuthPageProps {
  params: {
    type: string;
  };
}

export default async function AuthPage({ params: { type } }: AuthPageProps) {
  const session = await getServerSession({ ...options, req: null });

  if (session) redirect("/");

  return (
    <div className="w-full flex-grow flex items-center justify-center">
      <div className="w-[350px]">
        <Tabs
          className="w-full"
          defaultValue={type === "register" ? "register" : "login"}
        >
          <TabsList className={`grid w-full grid-cols-2`}>
            <TabsTrigger value="login">Se connecter</TabsTrigger>
            <TabsTrigger value="register">S&apos;inscrire</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <AuthLoginForm />
          </TabsContent>
          <TabsContent value="register">
            <AuthRegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
