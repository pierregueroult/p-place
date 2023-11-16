interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="w-full flex-grow flex items-center justify-center gradient-main">
      {children}
    </main>
  );
}
