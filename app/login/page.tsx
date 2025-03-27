"use client"; // Marca o componente como Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Usando o useRouter do App Router

import './styles.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e:any) => {
    e.preventDefault();
    try {
      const response = await fetch('https://whatsapp.dstorres.com.br:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Armazene o JWT
        router.push('/'); // Navega para a página de dashboard
        router.refresh(); // Força a atualização da página
      } else {
        const errorData = await response.json();
        console.error('Erro ao fazer login:', errorData.error);
      }
    } catch (error:any) {
      console.error('Erro ao fazer login:', error.message);
    }
  };

  return (
    <form 
        onSubmit={handleLogin}
        className="login-form"
        >
        <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
        />
        <button type="submit">Login</button>
        </form>
  );
}