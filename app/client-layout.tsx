"use client";

import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <main className="flex-1">{children}</main>
      <Footer />
    </SessionProvider>
  );
}
