"use client";

import { useDeviceWidth } from "@/lib/useDeviceWidth";

interface DesktopOnlyProps {
  children: React.ReactNode;
}

export default function DesktopOnly({ children }: DesktopOnlyProps) {
  const width = useDeviceWidth();
  if (width < 768) return null;
  return <>{children}</>;
}
