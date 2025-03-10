// pages/dashboard/logout.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('jwt');
    router.push('/auth/login');
  }, [router]);

  return null;
}