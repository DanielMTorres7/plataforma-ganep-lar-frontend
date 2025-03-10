'use client'; // Indica que este é um Client Component
import React from 'react';
import './Header.css';
// import Logout from '../LogOut/LogOut';

export default function HeaderComponent() {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  const redirect = (path: string) => {
    window.location.href = path;
  }

  return (
    <header className='header'>
      <img className="logo" src="/logo.png" alt="Logo da Empresa" /> {/* Caminho relativo à pasta public */}
      <nav>
        <button onClick={()=>redirect('/')}>Home</button>
        <button onClick={() => redirect('/orcamentos')}>Orçamentos</button>
        {/* <button onClick={() => redirect('/whatsapp')}>WhatsApp</button> */}
        <button onClick={() => redirect('/dashboards')}>DashBoards</button>
        <button onClick={() => redirect('/mapa')}>Mapa</button>
        <button onClick={logout}>LogOut</button>
      </nav>
    </header>
  );
}