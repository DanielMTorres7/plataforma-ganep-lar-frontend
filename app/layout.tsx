'use client';

import "./globals.css";
import HeaderComponent from "./components/layout/Header/Header";
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
        <HeaderComponent/>
        {children}
      </body>
    </html>
  );
}
