// components/ProtectedLayout.tsx
'use client';

import { useAuth } from './hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login'); // Redireciona para a página de login se não estiver autenticado
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Ou um loading spinner
  }

  return <>{children}</>;
}