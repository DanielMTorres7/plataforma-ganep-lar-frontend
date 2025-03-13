'use client';

import "./globals.css";
import Sidebar from "./components/layout/Sidebar/component";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      
        if (typeof window !== "undefined") {
          router.push("/login");
        }
      }
    }
  , [router]);
  
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
