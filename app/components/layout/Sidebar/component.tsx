'use client'; // Indica que este é um Client Component
import React, { useState, useEffect } from 'react';
import { FaHome, FaChartLine, FaMap, FaTh, FaMoneyBillAlt } from 'react-icons/fa'; // Exemplo de ícones
import './styles.css';
import Image from 'next/image';
import SVGIMG from "@/public/icons/whatsapp_icon.svg";
interface MenuItem {
  label: string;
  path?: string;
  icon: React.ReactNode;
  action?: () => void;
}


export default function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(true);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };
  
  const logout = () => {
    if (typeof window !== "undefined") {
      window.location.href = '/login';
    }
  };

  
  // Dados do menu
  const menuItems: MenuItem[] = [
    {
      label: 'Home',
      path: '/',
      icon: <FaHome />,
    },
    {
      label: 'Orçamentos',
      path: '/orcamentos',
      icon: <FaMoneyBillAlt />,
    },
    {
      label: 'DashBoards',
      icon: <FaChartLine />,
      path: '/dashboards',
    },
    {
      label: 'Mapa',
      path: '/mapa',
      icon: <FaMap />,
    },
    {
      label: 'Paineis',
      path: '/paineis',
      icon: <FaTh />,
    },
    // {
    //   label: 'DataSets',
    //   path: '/datasets',
    //   icon: <FaTh />,
    // },
    // {
    //   label: 'Configurações',
    //   path: '/configuracoes',
    //   icon: <FaTh />,
    // },
    // {
    //   label: 'Whatsapp',
    //   path: '/whatsapp',
    //   // public/icons/whatsapp_icon.svg
    //   icon: <Image src={SVGIMG} alt={"WhatsApp"} width={20} height={20} />,
    // }
    // {
    //   label: 'Sair',
    //   icon: <FaHome />,
    //   action: logout,
    // }
  ];

  // Verifica se o item do menu está ativo (correspondente à URL atual)
  const isActive = (path: string) => {
    return window.location.pathname === path;
  };

  const redirect = (path: string) => {
    if (typeof window !== "undefined") {
      window.location.href = path;
    }
  };

  return (
    <div className={`sidebar ${isMinimized ? 'minimized' : ''}`}>
      <span className='borda'></span>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isMinimized ? '=' : 'x'}
      </button>

      <div className="sidebar-content">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`menu-item ${isActive(item.path!) ? ' opened' : ''}`}
          >
            {item.path ? (
              <button onClick={() => redirect(item.path!)}>
                <span className="icon">{item.icon}</span>
                {!isMinimized && <span className="label">{item.label}</span>}
              </button>
            ) : (
              <button onClick={item.action!}>
                <span className="icon">{item.icon}</span>
                {!isMinimized && <span className="label">{item.label}</span>}
              </button>
            )
            }
          </div>
        ))}
      </div>
    </div>
  );
}