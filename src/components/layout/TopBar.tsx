import React from 'react';
import './Layout.css';

export const TopBar: React.FC = () => {
    return (
        <header className="palantir-topbar">
            <div className="topbar-logo">Slovak Data Analytics</div>
            <div className="topbar-search">
                <input type="text" placeholder="Search Anything (Subjects, Contracts, IDs)..." />
            </div>
            <div className="topbar-actions">
                <button aria-label="Profile" className="profile-btn">
                    <span className="profile-icon">User</span>
                </button>
            </div>
        </header>
    );
};
