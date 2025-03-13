'use client'; // Indica que este é um Client Component
import React, { useState, useEffect } from 'react';
import { FaHome, FaChartLine, FaMap, FaTh, FaMoneyBillAlt } from 'react-icons/fa'; // Exemplo de ícones
import './styles.css';

interface MenuItem {
  label: string;
  path?: string;
  icon: React.ReactNode;
  action?: () => void;
}


export default function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };
  
  // se estiver abertop deve adicionar uma margen a esquerda no body
  const toggleMenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  const logout = () => {
    // Faz o logout
    // Redireciona para a tela de login
    if (typeof window !== "undefined") {
      window.location.href = '/login';
    }
  };

  const redirect = (path: string) => {
    if (typeof window !== "undefined") {
    window.location.href = path;
    setCurrentPath(path); // Atualiza o caminho atual
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
    {
      label: 'DataSets',
      path: '/datasets',
      icon: <FaTh />,
    },
    // {
    //   label: 'Sair',
    //   icon: <FaHome />,
    //   action: logout,
    // }
  ];

  // Verifica se o item do menu está ativo (correspondente à URL atual)
  const isActive = (path: string) => {
    return currentPath === path;
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