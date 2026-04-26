"use client";

import { AuthProvider } from "@/components/auth/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
