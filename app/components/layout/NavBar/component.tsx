import React from 'react';
import './styles.css';


interface NavBarProps {
    children?: React.ReactNode;
}

export default function NavBar( { children }: NavBarProps ) {
    return (
        <nav className="navbar">
            {children}
        </nav>
    );
}

