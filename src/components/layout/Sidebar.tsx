import React from 'react';
import './Layout.css';

interface SidebarProps {
    currentView?: string;
    onNavigate?: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
    const handleNav = (e: React.MouseEvent, view: string) => {
        e.preventDefault();
        if (onNavigate) onNavigate(view);
    };

    return (
        <aside className="palantir-sidebar">
            <nav className="sidebar-nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <a href="#dashboard" onClick={(e) => handleNav(e, 'dashboard')} className={`nav-link ${currentView === 'dashboard' || !currentView ? 'active' : ''}`}>Dashboard</a>
                    </li>
                    <li className="nav-item">
                        <a href="#zmluvy" onClick={(e) => handleNav(e, 'zmluvy')} className={`nav-link ${currentView === 'zmluvy' ? 'active' : ''}`}>Zmluvy a Obstarávania</a>
                    </li>
                    <li className="nav-item">
                        <a href="#subjekty" onClick={(e) => handleNav(e, 'subjekty')} className={`nav-link ${currentView === 'subjekty' ? 'active' : ''}`}>Subjekty</a>
                    </li>
                    <li className="nav-item">
                        <a href="#mapa" onClick={(e) => handleNav(e, 'mapa')} className={`nav-link ${currentView === 'mapa' ? 'active' : ''}`}>Geo Spatial (Mapa)</a>
                    </li>
                    <li className="nav-item">
                        <a href="#analyza" onClick={(e) => handleNav(e, 'analyza')} className={`nav-link ${currentView === 'analyza' ? 'active' : ''}`}>Analýza Prepojení</a>
                    </li>
                </ul>
            </nav>
            <div className="sidebar-footer">
                <p className="version">v1.0-alpha</p>
            </div>
        </aside>
    );
};
