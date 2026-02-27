import React from 'react';
import './Layout.css';

export interface TopBarProps {
    currentView?: string;
    onNavigate?: (view: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ currentView, onNavigate }) => {
    const handleNav = (e: React.MouseEvent, view: string) => {
        e.preventDefault();
        if (onNavigate) onNavigate(view);
    };

    return (
        <header className="palantir-topbar">
            <div className="topbar-logo">C.O.R.E. OSINT</div>

            <nav className="topbar-nav">
                <a href="#dashboard" onClick={(e) => handleNav(e, 'dashboard')} className={`nav-link ${currentView === 'dashboard' || !currentView ? 'active' : ''}`}>Dashboard</a>
                <a href="#zmluvy" onClick={(e) => handleNav(e, 'zmluvy')} className={`nav-link ${currentView === 'zmluvy' ? 'active' : ''}`}>Zmluvy (CRZ)</a>
                <a href="#subjekty" onClick={(e) => handleNav(e, 'subjekty')} className={`nav-link ${currentView === 'subjekty' ? 'active' : ''}`}>Subjekty</a>
                <a href="#mapa" onClick={(e) => handleNav(e, 'mapa')} className={`nav-link ${currentView === 'mapa' ? 'active' : ''}`}>Geo Spatial</a>
                <a href="#analyza" onClick={(e) => handleNav(e, 'analyza')} className={`nav-link ${currentView === 'analyza' ? 'active' : ''}`}>Graph Analysis</a>
            </nav>

            <div className="topbar-actions">
                <button aria-label="Profile" className="profile-btn">
                    <span className="profile-icon">Analyst-01</span>
                </button>
            </div>
        </header>
    );
};
